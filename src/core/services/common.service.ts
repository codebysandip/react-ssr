export class CommonService {
  private static loaderCount = 0;

  public static toggleLoader(status: boolean) {
    if (!process.env.IS_SERVER) {
      if (status) {
        this.loaderCount += 1;
      } else {
        this.loaderCount -= 1;
      }
      if (!status) {
        if (this.loaderCount === 0) {
          window.dispatchEvent(new CustomEvent<boolean>("showLoader", { detail: false }));
        }
        return;
      }
      window.dispatchEvent(new CustomEvent<boolean>("showLoader", { detail: status }));
    }
  }
}
