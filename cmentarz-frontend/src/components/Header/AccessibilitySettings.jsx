import FontSizeButtons from "./FontSizeButtons";
import ThemeToggle from "./ThemeToggle";

const AccessibilitySettings = () => {
  return (
    <div className="accessibility-options">
      <FontSizeButtons/>
      <ThemeToggle/>
    </div>
  );
};

export default AccessibilitySettings;