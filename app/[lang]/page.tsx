import { notFound } from "next/navigation";
import { dirOf, hasLocale } from "@/app/lib/i18n";
import { getDictionary } from "./dictionaries";
import Header from "../components/sitora/Header";
import Hero from "../components/sitora/Hero";
import Services from "../components/sitora/Services";
import WhySitora from "../components/sitora/WhySitora";
import Process from "../components/sitora/Process";
import Projects from "../components/sitora/Projects";
import Industries from "../components/sitora/Industries";
import Testimonials from "../components/sitora/Testimonials";
import Contact from "../components/sitora/Contact";
import CtaBanner from "../components/sitora/CtaBanner";
import Footer from "../components/sitora/Footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict.header} />
      <main className="flex-1">
        <Hero dir={dirOf(lang)} dict={dict.hero} />
        <Services dict={dict.services} />
        <WhySitora dict={dict.why} />
        <Process dict={dict.process} />
        <Projects dict={dict.projects} />
        <Industries dict={dict.industries} />
        <Testimonials dict={dict.testimonials} />
        <Contact lang={lang} dict={dict.contact} />
        <CtaBanner dict={dict.cta} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
