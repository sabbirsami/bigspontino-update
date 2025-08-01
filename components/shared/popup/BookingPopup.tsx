'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin, Users, X } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function BookingPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('17:00');
  const [selectedGuests, setSelectedGuests] = useState('2');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState<'form' | 'success'>('form');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Booking submitted:', {
        selectedDate: selectedDate?.toISOString(),
        selectedTime,
        selectedGuests,
        formData,
      });
      setStatus('success');
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed lg:bottom-6 lg:right-6 bottom-0 right-0 w-full lg:w-[23rem] font-narrow bg-background shadow-2xl border border-secondary/5 z-50 font-sans max-h-[100vh] overflow-y-auto">
      {/* Header */}
      <div className="bg-red-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-main">Big Spuntino</h3>
            <p className="text-sm opacity-90">{t('booking.subtitle')}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-neutral-800"
            aria-label="Close booking popup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {status === 'success' ? (
          // Success Message Content
          <div className="text-center py-4 lg:py-8">
            <h3 className="text-xl font-bold mb-4">{t('booking.confirmation')}</h3>
            <p className="text-sm text-neutral-700 mb-2">
              {t('booking.confirmationText', {
                firstName: formData.firstName,
                lastName: formData.lastName,
              })}
            </p>
            <div className="bg-neutral-100 p-3 text-sm border border-secondary/5 text-left">
              <p className="font-medium text-secondary mb-1">
                {t('booking.confirmationDetails', {
                  guests: selectedGuests,
                  date: format(selectedDate || new Date(), 'MMM. dd'),
                  time: selectedTime,
                })}
              </p>
              <div className="flex items-center text-neutral-700 text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {t('booking.location')}
              </div>
              <p className="text-xs text-neutral-700 mt-2">
                {t('booking.emailSent', { email: formData.email })}
              </p>
              <p className="text-xs text-neutral-700">{t('booking.lookingForward')}</p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="mt-6 h-10 lg:h-8 bg-secondary hover:bg-neutral-800 text-white text-sm rounded-none w-full"
            >
              {t('booking.close')}
            </Button>
          </div>
        ) : (
          // Original Form Content
          <form onSubmit={handleSubmit}>
            {/* Quick Selection */}
            <div className="grid grid-cols-10 gap-2 text-sm mb-2">
              <div className="col-span-4">
                <Label className="text-xs text-neutral-700">{t('booking.guests')}</Label>
                <Select value={selectedGuests} onValueChange={setSelectedGuests}>
                  <SelectTrigger className="h-10 lg:h-8 w-full text-sm rounded-none">
                    <Users className="h-3 w-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {Array.from({ length: 8 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1} {i === 0 ? t('booking.guests') : t('booking.guests')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                <Label className="text-xs text-neutral-700">{t('booking.date')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 lg:h-9 w-full text-sm justify-start px-2 rounded-none border-secondary/5 text-secondary hover:bg-neutral-100 bg-transparent"
                    >
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {format(selectedDate || new Date(), 'MMM. dd')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 rounded-none border-secondary/5"
                    align="end"
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="col-span-3">
                <Label className="text-xs text-neutral-700">{t('booking.time')}</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="h-10 lg:h-8 w-full text-sm rounded-none">
                    <Clock className="h-3 w-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="17:00">17:00</SelectItem>
                    <SelectItem value="17:30">17:30</SelectItem>
                    <SelectItem value="18:00">18:00</SelectItem>
                    <SelectItem value="18:30">18:30</SelectItem>
                    <SelectItem value="19:00">19:00</SelectItem>
                    <SelectItem value="19:30">19:30</SelectItem>
                    <SelectItem value="20:00">20:00</SelectItem>
                    <SelectItem value="20:30">20:30</SelectItem>
                    <SelectItem value="21:00">21:00</SelectItem>
                    <SelectItem value="21:30">21:30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Quick Info */}
            <div className="bg-neutral-100 p-3 text-sm border border-secondary/5 mb-2">
              <p className="font-medium text-secondary mb-1">
                {t('booking.confirmationDetails', {
                  guests: selectedGuests,
                  date: format(selectedDate || new Date(), 'MMM. dd'),
                  time: selectedTime,
                })}
              </p>
              <div className="flex items-center text-neutral-700 text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {t('booking.location')}
              </div>
            </div>
            {/* Quick Form */}
            <div className="space-y-3 lg:space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    name="firstName"
                    placeholder={t('booking.firstName')}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="h-10 lg:h-8 text-sm rounded-none border-secondary/5"
                  />
                </div>
                <div>
                  <Input
                    name="lastName"
                    placeholder={t('booking.lastName')}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="h-10 lg:h-8 text-sm rounded-none border-secondary/5"
                  />
                </div>
              </div>
              <Input
                name="email"
                type="email"
                placeholder={t('booking.email')}
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-10 lg:h-8 text-sm rounded-none border-secondary/5"
              />
              <Input
                name="phone"
                type="tel"
                placeholder={t('booking.phone')}
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="h-10 lg:h-8 text-sm rounded-none border-secondary/5"
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 h-10 lg:h-8 cursor-pointer bg-secondary hover:bg-neutral-800 text-white text-sm rounded-none"
                >
                  {t('booking.reserve')}
                </Button>
              </div>
            </div>

            <p className="text-xs text-neutral-600 text-center mt-3 lg:mt-0">
              {t('booking.voucher')}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
