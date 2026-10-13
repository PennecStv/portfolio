// app/contact/page.tsx

"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { DefaultStyle, Divider, FieldLabel, RequiredFieldLabel } from "@/app/components/ContactForm";

export default function Contact() {
  return (
    <>
      <LoadingScreen />
      <div className="flex flex-1 flex-col bg-background font-sans">
        <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
          <h1 className="text-5xl font-semibold leading-tight sm:text-7xl">
            Me contacter
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-secondary sm:text-2xl">
            Joignable au +33 1 23 45 67 89 📞 <br/> Vous pouvez également m&apos;écrire
            directement grâce au formulaire ci-dessous.
          </p>
          <p className="mt-6 max-w-2xl text-xl leading-4 text-secondary sm:text-md">
          Les champs marqués d&apos;un astérisque (
            <span className="text-foreground text-red-500">*</span>
            ) sont obligatoires.  
          </p>

          <form
            className="mt-12 flex max-w-2xl flex-col gap-6"
            action="/api/contact"
            method="post"
            encType="multipart/form-data"
          >
            <div className="grid gap-6 sm:grid-cols-3">
              <RequiredFieldLabel label="Civilité">
                <select
                  className={DefaultStyle({ other: "w-min" })} 
                  name="title"
                  autoComplete="honorific-prefix"
                  required
                  defaultValue="other"
                >
                  <option value="mr">M.</option>
                  <option value="mrs">Mme</option>
                  <option value="other">Autre</option>
                </select>
              </RequiredFieldLabel>

              <RequiredFieldLabel label="Prénom">
                <input
                  className={DefaultStyle({})}
                  type="text"
                  name="firstname"
                  placeholder="Votre prénom"
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "Votre prénom";
                    }
                  }}
                  autoComplete="firstname"
                  required
                />
              </RequiredFieldLabel>
              <RequiredFieldLabel label="Nom">
                <input
                  className={DefaultStyle({})}
                  type="text"
                  name="lastname"
                  placeholder="Votre nom"
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "Votre nom";
                    }
                  }}
                  autoComplete="lastname"
                  required
                />
              </RequiredFieldLabel>

              <FieldLabel label="Entreprise">
                <input
                  className={DefaultStyle({ other: "w-lg" })}
                  type="text"
                  name="firm"
                  placeholder="Nom de votre entreprise"
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "Nom de votre entreprise";
                    }
                  }}
                  autoComplete="organization"
                  required
                />
              </FieldLabel>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <RequiredFieldLabel label="Email">
                <input
                  className={DefaultStyle({})}
                  type="email"
                  name="email"
                  placeholder="vous@exemple.com"
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "vous@exemple.com";
                    }
                  }}
                  autoComplete="email"
                  required
                />
              </RequiredFieldLabel>
              
              <FieldLabel label="Téléphone">
                <input
                  className={DefaultStyle({})}
                  type="text"
                  name="phone"
                  placeholder="Votre numéro de téléphone"
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
              <RequiredFieldLabel label="Objet" className="px-4 pt-3">
                <input
                  className="min-h-12 border-0 bg-transparent px-0 py-1 text-lg text-foreground italic outline-none placeholder:text-foreground/60"
                  type="text"
                  name="subject"
                  placeholder="L'objet de votre message"
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "L'objet de votre message";
                    }
                  }}
                  required
                />
              </RequiredFieldLabel>

              <Divider size="w-100">  </Divider>

              <RequiredFieldLabel label="Message" className="px-4 pb-3 pt-3">
                <textarea
                  className="min-h-40 resize-y border-0 bg-transparent px-0 py-1 text-lg text-foreground italic outline-none placeholder:text-foreground/60"
                  name="message"
                  placeholder="Votre message ..."
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "Votre message ...";
                    }
                  }}
                  required
                />
              </RequiredFieldLabel>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FieldLabel label="Pièce(s) jointe(s)">
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
              Envoyer le message
            </button>
          </form>
        </main>
      </div>
    </>
  );
}