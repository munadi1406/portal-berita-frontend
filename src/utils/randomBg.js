export default function randomBg() {
    const bgColor = [
      "bg-primary",
      "bg-secondary",
      "bg-accent",
      "bg-neutral",
      "info",
      "bg-warning",
    ];
    
    const randomBg = () => {
      return Math.floor(Math.random() * bgColor.length);
    };
    return bgColor[randomBg()];
  }
