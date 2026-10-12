// app/contact/page.tsx

"use client";
import LoadingScreen from "@/components/LoadingScreen";
import "../globals.css";

const Divider = () => {
    return (
        <hr
            style={{ borderTop: "1px solid lightgrey" }}
        ></hr>
    );
};

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
            action="mailto:contact@example.com"
            method="post"
            encType="text/plain"
          >
            <div className="grid gap-6 sm:grid-cols-3">
              <label className="flex flex-col gap-2 text-lg font-medium">
                <span>
                  Civilité <span className="text-red-500">*</span>
                </span>
                <select
                  className="min-h-12 w-min border-2 border-foreground bg-transparent px-2 py-3 text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary"
                  name="title"
                  autoComplete="honorific-prefix"
                  required
                  defaultValue="other"
                >
                  <option value="mr">M.</option>
                  <option value="mrs">Mme</option>
                  <option value="other">Autre</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-lg font-medium">
                <span>
                  Prénom <span className="text-red-500">*</span>
                </span>
                <input
                  className="min-h-12 border-2 border-foreground bg-transparent px-4 py-3 text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary"
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
              </label>
              <label className="flex flex-col gap-2 text-lg font-medium">
                <span>
                  Nom <span className="text-red-500">*</span>
                </span>
                <input
                  className="min-h-12 border-2 border-foreground bg-transparent px-4 py-3 text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary"
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
              </label>

              <label className="flex flex-col gap-2 text-lg font-medium">
                Entreprise
                <input
                  className="min-h-12 w-lg border-2 border-foreground bg-transparent px-4 py-3 text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary"
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
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-lg font-medium">
                <span>
                  Email <span className="text-red-500">*</span>
                </span>
                <input
                  className="min-h-12 border-2 border-foreground bg-transparent px-4 py-3 text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary"
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
              </label>
              
              <label className="flex flex-col gap-2 text-lg font-medium">
                Téléphone
                <input
                  className="min-h-12 border-2 border-foreground bg-transparent px-4 py-3 text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary"
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
                  // required
                />
              </label>
            </div>

            <div className="overflow-hidden border-2 border-foreground bg-transparent transition-colors focus-within:border-secondary">
              <label className="flex flex-col gap-2 px-4 pt-3 text-lg font-medium">
                <span>
                  Objet <span className="text-red-500">*</span> :
                <input
                  className="min-h-12 border-0 bg-transparent px-1 py-1 text-lg text-foreground italic outline-none placeholder:text-foreground/60"
                  type="text"
                  name="subject"
                  placeholder="l'objet de votre message"
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "l'objet de votre message";
                    }
                  }}
                  required
                />
                </span>
              </label>

              <Divider />

              <label className="flex flex-col gap-2 px-4 pb-3 pt-3 text-lg font-medium">
                <span>
                  Message <span className="text-red-500">*</span>
                </span>
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
              </label>
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