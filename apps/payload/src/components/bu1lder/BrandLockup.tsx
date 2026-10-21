export function BrandLockup() {
  return (
    <span className="miind-lockup">
      <strong>
        Bu<span className="text-brand-cyan">1</span>lder
      </strong>
      <small>
        BY
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="miind-logo-dark" src="/bu1lder/marca/miind-wordmark-white.svg" alt="MIIND" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="miind-logo-light" src="/bu1lder/marca/miind-wordmark-blue.svg" alt="MIIND" />
      </small>
    </span>
  )
}
