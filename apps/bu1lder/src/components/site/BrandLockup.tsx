import { assetUrl } from "@/asset-url";
export function BrandLockup() {
  return (
    <span className="miind-lockup">
      <strong>
        Bu<span className="text-brand-cyan">1</span>lder
      </strong>
      <small>
        BY
        <img
          className="miind-logo-dark"
          src={assetUrl("/media/miind-wordmark-white.svg")}
          alt="MIIND"
        />
        <img
          className="miind-logo-light"
          src={assetUrl("/media/miind-wordmark-blue.svg")}
          alt="MIIND"
        />
      </small>
    </span>
  );
}
