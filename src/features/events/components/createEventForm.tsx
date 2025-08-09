// src/components/events/AddEventForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventSchema } from "../schemas/eventSchema";
import type { EventFormData, EventTypeOption, Props } from "../types/types";
import * as React from "react";
import { useEffect, useState } from "react";
import { DateOnlyPicker } from "./dateOnlyPicker";
import { getEventTypes } from "../services/eventService";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Building2,
  FileText,
  Image,
  AlertCircle,
  CheckCircle,
  Upload,
} from "lucide-react";
import { useBoolean } from "@/shared/hooks/useBoolean";

export const AddEventForm: React.FC<Props> = ({ onSubmit, onFileChange }) => {
  const [eventTypes, setEventTypes] = useState<EventTypeOption[]>([]);
  const [isVisible, { setTrue }] = useBoolean();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [, setError] = useState("");

  useEffect(() => {
    setTrue();
    getEventTypes()
      .then((value) => {
        setEventTypes(value);
      })
      .catch((err: any) => {
        setError(err);
      });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      type: 0,
      description: "",
      location: "",
      organization: "",
      capacity: 0,
      eventDate: new Date(),
      eventTime: "",
      eventImageUrl: "",
      cutoffDate: new Date(),
    },
  });

  const eventDate = watch("eventDate");
  const eventTime = watch("eventTime");
  const cutoffDate = watch("cutoffDate");

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    onFileChange?.(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    getEventTypes()
      .then((value) => {
        setEventTypes(value);
      })
      .catch((err: any) => {
        setError(`Failed to fetch event types: ${err}`);
      });
  }, []);

  const FormSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    delay: number;
  }> = ({ title, icon, children, delay }) => (
    <div
      className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const FormField: React.FC<{
    label: string;
    error?: string;
    children: React.ReactNode;
    info?: string;
  }> = ({ label, error, children, info }) => (
    <div className="space-y-2">
      <Label className="text-gray-300 font-medium">{label}</Label>
      {children}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      {info && !error && (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <CheckCircle className="w-4 h-4" />
          {info}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-black relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Create New Event
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Fill in the details below to create an amazing event experience
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormSection
              title="Basic Information"
              icon={<FileText className="w-6 h-6 text-purple-400" />}
              delay={200}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Event Title" error={errors.title?.message}>
                  <Input
                    {...register("title")}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50"
                    placeholder="Enter event title"
                  />
                </FormField>

                <FormField label="Event Type" error={errors.type?.message}>
                  <Select
                    onValueChange={(value: any) =>
                      setValue("type", Number(value), { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {eventTypes.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value.toString()}
                          className="text-white hover:bg-gray-700"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <FormField
                label="Description"
                error={errors.description?.message}
              >
                <Textarea
                  {...register("description")}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/50 min-h-[120px]"
                  placeholder="Describe your event in detail"
                />
              </FormField>
            </FormSection>

            <FormSection
              title="Location & Organization"
              icon={<MapPin className="w-6 h-6 text-purple-400" />}
              delay={400}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Location" error={errors.location?.message}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      {...register("location")}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/50"
                      placeholder="Event venue or address"
                    />
                  </div>
                </FormField>

                <FormField
                  label="Organization"
                  error={errors.organization?.message}
                >
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      {...register("organization")}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/50"
                      placeholder="Organizing company or group"
                    />
                  </div>
                </FormField>
              </div>
            </FormSection>

            <FormSection
              title="Event Details"
              icon={<Calendar className="w-6 h-6 text-purple-400" />}
              delay={600}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Event Date"
                  error={errors.eventDate?.message}
                  info={
                    eventDate
                      ? `Selected: ${format(eventDate, "PPP")}`
                      : undefined
                  }
                >
                  <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                    <DateOnlyPicker
                      onDateChange={(date) => {
                        if (date) {
                          setValue("eventDate", date);
                        }
                      }}
                    />
                  </div>
                </FormField>

                <FormField
                  label="Event Time"
                  error={errors.eventTime?.message}
                  info={eventTime ? `Selected: ${eventTime}` : undefined}
                >
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="time"
                      {...register("eventTime")}
                      className="pl-10 bg-white/10 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/50"
                    />
                  </div>
                </FormField>

                <FormField label="Capacity" error={errors.capacity?.message}>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="number"
                      min="1"
                      {...register("capacity", {
                        setValueAs: (value) =>
                          value === "" ? undefined : Number(value),
                      })}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
                      placeholder="Max attendees"
                    />
                  </div>
                </FormField>
              </div>

              <FormField
                label="Registration Cutoff Date"
                error={errors.cutoffDate?.message}
                info={
                  cutoffDate
                    ? `Selected: ${format(cutoffDate, "PPP")}`
                    : undefined
                }
              >
                <div className="bg-white/10 border border-white/20 rounded-lg p-4 max-w-md">
                  <DateOnlyPicker
                    onDateChange={(date) => setValue("cutoffDate", date)}
                  />
                </div>
              </FormField>
            </FormSection>

            <FormSection
              title="Event Image"
              icon={<Image className="w-6 h-6 text-purple-400" />}
              delay={800}
            >
              <FormField label="Upload Event Image">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-pink-400 bg-purple-400/10"
                      : "border-white/20 bg-white/5 hover:border-purple-400/50 hover:bg-white/10"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0] || null)
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-purple-400/20 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-purple-400" />
                    </div>

                    {selectedFile ? (
                      <div>
                        <p className="text-green-400 font-medium">
                          {selectedFile.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Click or drag to replace
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-white font-medium mb-2">
                          Drop your image here or click to browse
                        </p>
                        <p className="text-gray-400 text-sm">
                          Supports JPG, PNG
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FormField>
            </FormSection>

            <div
              className={`text-center pt-8 transition-all duration-1000 delay-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Event...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    Create Event
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
