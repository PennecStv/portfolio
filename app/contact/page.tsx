// app/contact/page.tsx

"use client";
import LoadingScreen from "@/components/LoadingScreen";

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

          <form
            className="mt-12 flex max-w-2xl flex-col gap-6"
            action="mailto:contact@example.com"
            method="post"
            encType="text/plain"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-lg font-medium">
                Nom
                <input
                  className="min-h-12 border-2 border-foreground bg-transparent px-4 py-3 text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary"
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  onFocus={(event) => {
                    event.currentTarget.placeholder = "";
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.value) {
                      event.currentTarget.placeholder = "Votre nom";
                    }
                  }}
                  autoComplete="name"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-lg font-medium">
                Email
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
            </div>

            <label className="flex flex-col gap-2 text-lg font-medium">
              Message
              <textarea
                className="min-h-40 resize-y border-2 border-foreground bg-transparent px-4 py-3 text-lg text-foreground italic outline-none transition-colors placeholder:text-foreground/60 focus:border-secondary"
                name="message"
                placeholder="Votre message"
                onFocus={(event) => {
                  event.currentTarget.placeholder = "";
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.value) {
                    event.currentTarget.placeholder = "Votre message";
                  }
                }}
                required
              />
            </label>

            <input type="hidden" name="subject" value="Nouveau message" />
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