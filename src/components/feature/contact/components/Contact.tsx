import { ContactSocialItem } from '@components';

import { socials } from '../contact.data';

export const Contact = () => {
  return (
    <section className="py-8 text-sm">
      <p className="leading-7 mb-5">
        اگر سوالی دارید، نیاز به پشتیبانی دارید یا فقط می‌خواهید با ما در تماس
        باشید، تیم ما آماده پاسخگویی به شماست. از طریق روش‌های زیر می توانید
        نظر، انتقاد یا پیشنهادات خود را با ما مطرح کنید. مطمئناً این موارد به ما
        کمک می‌کنند تا خدمات خود را بهبود دهیم و نیازهای شما را بهتر بشناسیم.
      </p>
      <div className="flex items-start flex-col gap-4 ltr">
        {socials.map((social) => (
          <ContactSocialItem key={social.title} social={social} />
        ))}
      </div>
    </section>
  );
};

Contact.displayName = 'Contact';
