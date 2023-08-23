import rand from "../lib/rand";

export namespace NotificationNS {
    export interface Notification {
        id: string;
        job_step_id: string;
        location_id: string;
        message: Readonly<string>;
        isRead: boolean;
        ctime: number;
    }

    export interface CreateNotificationParams {
        job_step_id: string;
    }

    export interface BLL {
        CreateNotification(params: CreateNotificationParams): Promise<Notification>;
        ListNotification(location_id: string): Promise<Notification[]>;
        ReadNotification(id: string): Promise<Notification>;
        ReadAllNotification(location_id: string): Promise<void>;
    }

    export interface DAL {
        CreateNotification(notication: Notification): Promise<void>;
        ListNotification(location_id: string): Promise<Notification[]>;
        ReadNotification(id: string): Promise<void>;
        ReadAllNotification(location_id: string): Promise<void>;
    }

    export const Generator = {
        NewNotificationId : () => rand.alphabet(16)
    }
}