import "./loader.scss";

export function Loader(props: LoaderProps) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="loader-container">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

interface LoaderProps {
  show?: boolean;
}
