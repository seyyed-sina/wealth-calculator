export interface SocialItem {
  title: string;
  icon: string;
  url: string;
  color?: string;
  social: 'Gmail' | 'Telegram' | 'LinkedIn' | 'Phone';
  className?: string
}
