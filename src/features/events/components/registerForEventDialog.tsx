import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKeycloak } from "@/shared/hooks/useKeycloak";
import { userRegistrationSchema } from "@/features/users/publicUsers/schemas/userEventRegistrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UserEventRegistrationData } from "@/features/users/types/types";
import { useParams } from "react-router-dom";

export function RegisterForEventDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onSubmit: (data: UserEventRegistrationData) => void;
  onOpenChange: (value: boolean) => void;
}) {
  const { eventId } = useParams();
  const { user } = useKeycloak();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEventRegistrationData>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      id: "",
      registeredUserName: user?.name ?? "",
      eventId: eventId ?? "",
      publicUserId: user?.sub ?? "",
      email: user?.email ?? "",
      registeredAt: new Date(),
      phoneNumber: user?.phone_number ?? "",
    },
  });

  console.log("Public user Id" + user?.sub);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register for this Event</DialogTitle>
            <DialogDescription>
              Enter valid details below to register for this amazing event.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="registeredUserName">Name</Label>
              <Input {...register("registeredUserName")} />
              {errors.registeredUserName && (
                <span className="text-red-500 text-sm">
                  {errors.registeredUserName.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input {...register("phoneNumber")} />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
