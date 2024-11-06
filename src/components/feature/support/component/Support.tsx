import { LucidIcon } from '@components';

export const Support = () => {
  return (
    <section className="py-8">
      <p className="text-sm leading-7">
        تیم ما با تلاش و علاقه فراوان به ارائه بهترین خدمات و محتوای ممکن
        می‌پردازد. هدف ما ارتقاء کیفیت خدمات و فراهم کردن تجربه‌ای مطلوب برای
        شما است. ما همواره سعی کرده‌ایم تا بهترین‌ها را برای شما فراهم کنیم، و
        حمایت شما به ما انگیزه و توان ادامه این راه را می‌دهد. <br />
        اگر از خدمات و محتوای ما رضایت دارید، حمایت شما می‌تواند به ادامه فعالیت
        ما کمک بزرگی کند. هرگونه کمک و حمایت شما، چه کوچک و چه بزرگ، موجب دلگرمی
        ما و تقویت تیم برای ارائه خدمات بهتر خواهد شد.
        <br />
        با حمایت شما، ما قادر خواهیم بود به توسعه امکانات جدید، بهبود کیفیت
        خدمات و ارتقاء سطح پشتیبانی خود بپردازیم. این کمک‌ها نه تنها به تیم ما
        کمک می‌کنند، بلکه به شما نیز این امکان را می‌دهند که از خدمات بهتر و با
        کیفیت‌ تری بهره‌مند شوید. <br />
        برای حمایت از ما، روی دکمه زیر کلیک کنید و با ورود به صفحه پرداخت، از
        تیم ما حمایت کنید. از همراهی و حمایت شما سپاسگزاریم.
        <div className="flex items-center justify-center mt-5">
          <a
            className="text-sm flex items-center justify-center text-center gap-2 px-5 h-11 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
            href="https://zarinp.al/seyed-sina"
            target="_blank"
            rel="noreferrer">
            <LucidIcon
              name="hand-coins"
              className="size-5"
            />
            برای حمایت از ما کلیک کنید
          </a>
        </div>
      </p>
    </section>
  );
};

Support.displayName = 'Support';
