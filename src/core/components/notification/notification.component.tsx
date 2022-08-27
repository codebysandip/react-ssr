import React from "react";
import { Subscription } from "rxjs";
import { Notification$ } from "src/app-subject.js";

export class Notification extends React.Component<Record<string, any>, NotificationState> {
  public state: Readonly<NotificationState> = {
    notifications: [],
  };

  public subscription$ = new Subscription();
  public intervalId: any;

  private startInterval() {
    this.intervalId = setInterval(() => {
      const expired = this.state.notifications.filter((n) => Date.now() > n.expireOn);
      if (expired.length) {
        const notifications = this.state.notifications.filter((n) => n.expireOn > Date.now());
        if (!notifications.length) {
          clearInterval(this.intervalId);
        }
        this.setState({ notifications });
      }
    }, 1000);
  }

  public componentDidMount() {
    Notification$.subscribe((notification) => {
      const notification2: INotification2 = {
        ...notification,
        expireOn: Date.now() + (notification.timeout || 5) * 1000,
        id: Math.random(),
      };
      const ns = [notification2, ...this.state.notifications.filter((n) => n.expireOn > Date.now())];
      this.setState({ notifications: ns });
      this.startInterval();
    });
  }

  public componentWillUnmount() {
    this.subscription$.unsubscribe();
    clearInterval(this.intervalId);
  }

  public close(id: number) {
    this.setState({
      notifications: this.state.notifications.filter((n) => n.id !== id && n.expireOn > Date.now()),
    });
  }

  public render() {
    // replace html with your design toast/snackbar
    return (
      <div aria-live="polite" aria-atomic="true" style={{ position: "relative", minHeight: "200px" }}>
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          {this.state.notifications.map((notification, idx) => {
            return (
              <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" key={idx}>
                <div className="toast-header">
                  <img src="..." className="rounded mr-2" alt="..." />
                  {/* <strong className="mr-auto">Bootstrap</strong>
                <small className="text-muted">just now</small> */}
                  <button
                    type="button"
                    className="ml-2 mb-1 close"
                    data-dismiss="toast"
                    aria-label="Close"
                    onClick={() => this.close(notification.id)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="toast-body">{notification.message}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export interface INotification {
  message: string;
  notificationType: "success" | "error" | "warning";
  /**
   * Hide in milliseconds
   * @default 5000
   */
  timeout?: number;
}

interface INotification2 extends INotification {
  id: number;
  expireOn: number;
}

export interface NotificationState {
  notifications: INotification2[];
}
