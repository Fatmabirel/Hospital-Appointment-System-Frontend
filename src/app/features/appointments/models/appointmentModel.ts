export interface Appointment {
    id: number;
    date: Date;
    time: string;
    status: boolean;
    doctorId: string;
    doctorFirstName: string;
    doctorLastName: string;
    doctorTitle: string;
    branchName: string;
    patientId: string;
    patientFirstName: string;
    patientLastName: string;
  }
  