// 운영진 Type
declare interface Admin {
  id: string; //운영진 id
  groupId?: string;
  name: string;
  email: string;
}

//운영진 일정 Form
declare interface AdminsScheduleFormData {
  scheduleData: TimeSlotAdmins;
}

//운영진 일정
declare interface TimeSlotAdmins {
  [timeSlot: string]: string[];
}
