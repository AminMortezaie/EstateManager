import { MobilePreview } from "../components/MobilePreview";
import { Topbar } from "../components/Topbar";

export function MobileApp() {
  return (
    <div>
      <Topbar
        title="Mobile Agent App Preview"
        subtitle="Presentation flow for the companion field app experience"
      />
      <MobilePreview />
    </div>
  );
}
