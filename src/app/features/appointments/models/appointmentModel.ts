export interface Appointment {
    id?: number;
    date?: Date;
    time?: string;
    status?: boolean;
    doctorId?: string;
    doctorFirstName?: string;
    doctorLastName?: string;
    doctorTitle?: string;
    branchName?: string;
    patientID: string;
    patientFirstName?: string;
    patientLastName?: string;
    patientnationalIdentity?:string;
    patientdateOfBirth?:Date;
    patientPhone?:string;
    patientAge?:number;
    


  }
  