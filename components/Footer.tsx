import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <>
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <a href="https://www.facebook.com/schrodingerhat" target="_blank" rel="noreferrer">
              <Image width={30} height={30} src="/icons/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://twitter.com/OSDayDev" target="_blank" rel="noreferrer">
              <Image width={30} height={30} src="/icons/twitter.svg" alt="Twitter" />
            </a>
            <a href="https://discord.com/invite/RTXr8A3eFn" target="_blank" rel="noreferrer">
              <Image width={30} height={30} src="/icons/discord.svg" alt="Discord" />
            </a>
            <a href="https://www.instagram.com/schrodinger_hat/" target="_blank" rel="noreferrer">
              <Image width={30} height={30} src="/icons/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://github.com/Schrodinger-Hat/osday-2023/" target="_blank" rel="noreferrer">
              <Image width={30} height={30} src="/icons/github.svg" alt="Gthub" />
            </a>
          </div>
          <div className="footer-center">
            <p>
              {t('github_repo_1')}
              <a href="https://github.com/Schrodinger-Hat/osday-2023/" target="_blank" rel="noreferrer">
              {t('github_repo_2')}
              </a>
            </p>
            <p>
              {t('github_issue_1')}
              <a href="https://github.com/Schrodinger-Hat/osday-2023/issues" target="_blank" rel="noreferrer">
              {t('github_issue_2')}
              </a>
            </p>
          </div>
          <div className="footer-footer">
            <p className="footer-footer-links">
              <Link href={'/policies'}>{t('privacy_policy')}</Link>
              <span>|</span>
              <Link href={'/rules'}>{t('rules')}</Link>
              <span>|</span>
              <Link href={'/dei'}>{t('dei')}</Link>
            </p>
            <p>Made with ❤️ in Florence & Paris</p>
            <p>©{(new Date()).getFullYear()} Schrödinger Hat</p>
          </div>
        </div>
      </footer>
    </>
  );
}
