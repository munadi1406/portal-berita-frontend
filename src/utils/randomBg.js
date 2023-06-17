export default function randomBg() {
    const bgColor = [
      "bg-primary",
      "bg-secondary",
      "bg-accent",
      "bg-neutral",
      "bg-info",
      "bg-warning",
    ];
    
    const randomBg = () => {
      const randomIndex = Math.floor(Math.random() * bgColor.length);
      return bgColor[randomIndex];
    };
  
    return randomBg();
  }
