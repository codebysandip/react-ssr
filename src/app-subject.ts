import { Subject } from "rxjs";
import { INotification } from "core/components/notification/notification.component.js";

export const Notification$ = new Subject<INotification>();
