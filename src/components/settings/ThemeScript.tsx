// Runs before hydration so the first paint already has the right theme, rather
// than flashing light and then correcting itself.
const script = `(function(){try{
var raw=localStorage.getItem("hadithly.settings.v1");
var s=raw?JSON.parse(raw):{};
var theme=s.theme==="light"||s.theme==="dark"||s.theme==="system"?s.theme:"system";
var dark=theme==="dark"||(theme==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
var root=document.documentElement;
root.classList.toggle("dark",dark);
root.dataset.theme=theme;
}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
