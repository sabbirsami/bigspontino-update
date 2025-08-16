/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { t } = useTranslation();
  const [isWidgetLoading, setIsWidgetLoading] = useState(true);
  const [widgetLoadError, setWidgetLoadError] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  const loadOpenTableWidget = () => {
    if (widgetContainerRef.current && !isWidgetLoading) {
      setIsWidgetLoading(true);
      setWidgetLoadError(false);
      
      // Clear any existing widget content
      widgetContainerRef.current.innerHTML = '';
      
      // Create OpenTable widget container with proper attributes
      const widgetDiv = document.createElement('div');
      widgetDiv.id = 'ot-reservation-widget-modal';
      widgetDiv.setAttribute('data-rid', '441969');
      widgetDiv.setAttribute('data-domain', 'de');
      widgetDiv.setAttribute('data-type', 'standard');
      widgetDiv.setAttribute('data-theme', 'standard');
      widgetDiv.setAttribute('data-overlay', 'false');
      widgetDiv.setAttribute('data-format', 'list');
      widgetDiv.setAttribute('data-language', 'de-DE');
      widgetDiv.style.width = '100%';
      widgetDiv.style.height = '500px';
      widgetDiv.style.minHeight = '400px';
      
      widgetContainerRef.current.appendChild(widgetDiv);
      
      // Load OpenTable script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.opentable.de/widget/reservation/loader?rid=441969&domain=de&type=standard&theme=standard&overlay=false&format=list';
      script.async = true;
      
      script.onload = () => {
        console.log('OpenTable modal script loaded successfully');
        // Check if widget is initialized after a delay
        setTimeout(() => {
          const widget = document.getElementById('ot-reservation-widget-modal');
          if (widget && widget.innerHTML.trim()) {
            console.log('OpenTable modal widget initialized:', widget.innerHTML.length, 'characters');
          } else {
            console.log('OpenTable modal widget not found or empty, showing fallback');
            showFallbackBooking();
          }
        }, 2000);
      };
      
      script.onerror = () => {
        console.error('Failed to load OpenTable modal script, showing fallback');
        showFallbackBooking();
      };
      
      document.head.appendChild(script);
      
      function showFallbackBooking() {
        if (widgetContainerRef.current) {
          widgetContainerRef.current.innerHTML = `
            <div style="padding: 24px; text-align: center; border: 2px solid #e0e0e0; border-radius: 12px; background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%); font-family: 'Arial', sans-serif; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); cursor: pointer;" 
                 onclick="window.open('https://www.opentable.de/restref/client/?restref=441969', '_blank');">
              <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 8px 0; color: #333; font-size: 24px; font-weight: bold;">Reserve Your Table</h3>
                <p style="color: #666; margin: 0; font-size: 16px;">Click anywhere to book directly through OpenTable</p>
              </div>
              
              <div style="display: inline-block; background: linear-gradient(135deg, #da3743 0%, #c12e3a 100%); color: white; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 18px; box-shadow: 0 2px 4px rgba(218, 55, 67, 0.3);">
                🍽️ Book Now on OpenTable
              </div>
            </div>
          `;
        }
      }
      setIsWidgetLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure modal content is mounted before loading widget
      const timeoutId = setTimeout(() => {
        loadOpenTableWidget();
      }, 200);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-4xl max-h-[90vh] bg-white rounded-none shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-primary text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {t("buttons.bookTable") || "Book A Table"}
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Widget Container */}
            <div className="w-full h-full pt-16">
              {isWidgetLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">{t("loading") || "Loading booking widget..."}</p>
                  </div>
                </div>
              )}
              {widgetLoadError && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <p className="text-red-600 mb-4">{t("error") || "Failed to load booking widget"}</p>
                    <button
                      onClick={loadOpenTableWidget}
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                    >
                      {t("retry") || "Retry"}
                    </button>
                  </div>
                </div>
              )}
              <div
                ref={widgetContainerRef}
                className="w-full h-full overflow-auto"
                style={{ display: isWidgetLoading || widgetLoadError ? 'none' : 'block' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
