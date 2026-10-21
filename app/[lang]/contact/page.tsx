"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { DefaultStyle, Divider, FieldLabel, SocialRotaryButton } from "@/app/components/ContactForm";
import { useI18n } from "@/app/i18n";

export default function Contact() {
  const { t } = useI18n();
  return (
    <>
      <LoadingScreen />
      <div className="flex flex-1 flex-col bg-background font-sans">
        <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
          <h1 className="text-5xl font-semibold leading-tight sm:text-7xl">
            { t.contact.title }
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-secondary sm:text-2xl">
            { t.contact.callMeOn } +33 1 23 45 67 89 📞 
          </p>

          <div className="mt-6 flex items-center gap-4">
            <SocialRotaryButton />
          </div>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-secondary sm:text-2xl">
            { t.contact.description }
          </p>
          <p className="mt-6 max-w-2xl text-xl leading-4 text-secondary sm:text-md">
          { t.contact.subdescription } (
            <span className="text-foreground text-red-500">*</span>
            ).  
          </p>

          <form
            className="mt-12 flex max-w-2xl flex-col gap-6"
            action="/api/contact"
            method="post"
            encType="multipart/form-data"
          >
            <div className="grid gap-6 sm:grid-cols-3">
              <FieldLabel label={ t.contact.honoricLabel } required>
                <select
                  className={DefaultStyle({ other: "w-min" })} 
                  name="title"
                  autoComplete="honorific-prefix"
                  required
                  defaultValue="other"
                >
                  <option value="mr">{ t.contact.honoricValue.mr }</option>
                  <option value="mrs">{ t.contact.honoricValue.mrs }</option>
                  <option value="ms">{ t.contact.honoricValue.ms }</option>
                  <option value="dr">{ t.contact.honoricValue.dr }</option>
                  <option value="prof">{ t.contact.honoricValue.prof }</option>
                  <option value="other">{ t.contact.honoricValue.other }</option>
                </select>
              </FieldLabel>

              <FieldLabel label={ t.contact.firstNameLabel } required>
                <input
                  className={DefaultStyle({})}
                  type="text"
                  name="firstname"
                  placeholder={ t.contact.firstNamePlaceholder }
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = t.contact.firstNamePlaceholder;
                    }
                  }}
                  autoComplete="firstname"
                  required
                />
              </FieldLabel>
              <FieldLabel label={ t.contact.lastNameLabel } required>
                <input
                  className={DefaultStyle({})}
                  type="text"
                  name="lastname"
                  placeholder={ t.contact.lastNamePlaceholder }
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = t.contact.lastNamePlaceholder;
                    }
                  }}
                  autoComplete="lastname"
                  required
                />
              </FieldLabel>

              <FieldLabel label={ t.contact.companyLabel }>
                <input
                  className={DefaultStyle({ other: "w-lg" })}
                  type="text"
                  name="firm"
                  placeholder={ t.contact.companyPlaceholder }
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = t.contact.companyPlaceholder;
                    }
                  }}
                  autoComplete="organization"
                  required
                />
              </FieldLabel>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FieldLabel label={ t.contact.emailLabel } required>
                <input
                  className={DefaultStyle({})}
                  type="email"
                  name="email"
                  placeholder={ t.contact.emailPlaceholder }
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = t.contact.emailPlaceholder;
                    }
                  }}
                  autoComplete="email"
                  required
                />
              </FieldLabel>
              
              <FieldLabel label={ t.contact.phoneLabel }>
                <input
                  className={DefaultStyle({})}
                  type="text"
                  name="phone"
                  placeholder={ t.contact.phonePlaceholder }
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "01 23 45 67 89";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "01 23 45 67 89";
                    }
                  }}
                  autoComplete="tel"
                />
              </FieldLabel>
            </div>

            <div className="overflow-hidden border-2 border-foreground bg-transparent transition-colors focus-within:border-secondary rounded-xl">
              <FieldLabel label={ t.contact.subjectLabel } required className="px-4 pt-3">
                <input
                  className="min-h-12 border-0 bg-transparent px-0 py-1 text-lg text-foreground italic outline-none placeholder:text-foreground/60"
                  type="text"
                  name="subject"
                  placeholder={ t.contact.subjectPlaceholder }
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = t.contact.subjectPlaceholder;
                    }
                  }}
                  required
                />
              </FieldLabel>

              <Divider size="w-100" />

              <FieldLabel label={ t.contact.messageLabel } required className="px-4 pb-3 pt-3">
                <textarea
                  className="min-h-40 resize-y border-0 bg-transparent px-0 py-1 text-lg text-foreground italic outline-none placeholder:text-foreground/60"
                  name="message"
                  placeholder={ t.contact.messagePlaceholder }
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = t.contact.messagePlaceholder;
                    }
                  }}
                  required
                />
              </FieldLabel>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FieldLabel label={ t.contact.attachmentsLabel }>
                <input
                  className={DefaultStyle({})}
                  type="file"
                  name="attachments"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  multiple
                />
              </FieldLabel>
            </div>

            <button
              className="min-h-12 w-fit bg-foreground px-6 py-3 text-lg font-semibold text-background transition-opacity hover:opacity-80 focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
              type="submit"
            >
              { t.contact.submitButton }
            </button>
          </form>
        </main>
      </div>
    </>
  );
}