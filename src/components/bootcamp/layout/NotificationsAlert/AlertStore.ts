import { action, computed, makeObservable, observable } from "mobx";
import { enableStaticRendering } from "mobx-react";

enableStaticRendering(typeof window === "undefined");

interface Alert {
  id: number;
  show: boolean;
  type: AlertType;
  message: string;
  duration?: number;
}
type AlertType = "error" | "warning" | "info" | "success";

export class AlertStoreImpl {
  alerts: Alert[] = [];

  constructor() {
    makeObservable(this, {
      alerts: observable,
      show: action,
      hide: action,
      clear: action,
      getAlerts: computed,
    });
  }

  show(message: string, type: AlertType, duration = 3000) {
    this.clear();
    const alert: Alert = {
      id: +new Date(),
      show: true,
      message,
      type,
      duration,
    };
    this.alerts.push(alert);
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  hide() {
    if (this.alerts.length > 0) this.alerts[0].show = false;
  }

  clear() {
    this.alerts = [];
  }

  get getAlerts() {
    return this.alerts;
  }
}

export const AlertStore = new AlertStoreImpl();
