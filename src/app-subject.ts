import { Subject } from "rxjs";
import { INotification } from "./core/components/notification/notification.component";

export const Notification$ = new Subject<INotification>();
