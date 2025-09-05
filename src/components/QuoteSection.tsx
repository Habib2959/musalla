export function QuoteSection() {
  return (
    <section className="py-16 bg-green-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <div className="text-6xl text-green-300 mb-4">"</div>
          <blockquote className="text-xl md:text-2xl leading-relaxed italic">
            "O people! Fear the Lord, who created you from one soul, and from it He created its mate, and from them both He spread countless men and women. And fear Allah, in whose name you ask of one another, and (fear to cut the relations of) the wombs. Indeed, Allah is ever watching over you."
          </blockquote>
          <cite className="block mt-6 text-lg font-semibold text-green-200">
            — Quran 4:1
          </cite>
        </div>
      </div>
    </section>
  );
}