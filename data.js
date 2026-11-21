/* ==========================================================================
   kuro — data.js
   Two complete menus (Coffee / kuro and Matcha / midori) with the SAME shape.
   Edit copy, prices and flavours here. The page structure never changes.

   • `photo: null`  → the picture is drawn in code (see art.js)
   • `photo: "img/latte.jpg"` → your own photo is used instead
   • `layer.top / layer.bot` are the two colours of the drink in the hero cup
   ========================================================================== */
window.KURO_CONFIG = {
  // Optional: a form URL (Formspree, Mailchimp, your own server). Leave "" for the demo behaviour.
  newsletterEndpoint: ""
};

window.KURO = {
  order: ['coffee', 'matcha'],
  themes: {

    /* ───────────────────────────── COFFEE · kuro ───────────────────────────── */
    coffee: {
      label: 'Coffee',
      themeColor: '#120B08',
      art: { wall: ['#3A2417', '#1A0F09'], table: ['#4D301E', '#24150D'], glow: '#FFC987', accent: '#D9A066' },

      copy: {
        heroTitle: 'Choose your iced latte',
        storyEyebrow: 'Our story',
        storyTitle: 'Slow coffee, poured cold.',
        storyP: [
          'kuro began as six seats and one grinder in the corner of a Portland roastery. We wanted an iced latte that tasted like the coffee, not the ice.',
          'So we steep for eighteen hours, roast in small batches, and pour every cup by hand. Nothing rushed, nothing syrupy, nothing you can’t pronounce.'
        ],
        storyBadge: 'Est. 2019 · Portland',
        stats: [{ v: '18h', l: 'Cold steep' }, { v: '12kg', l: 'Per roast batch' }, { v: '0', l: 'Artificial syrups' }],

        menuEyebrow: 'The menu',
        menuTitle: 'Six lattes, poured cold.',
        menuCta: 'Order for pickup',
        info: [
          { icon: 'snowflake', t: 'Cold-steeped', d: 'Eighteen slow hours, never flash-chilled.' },
          { icon: 'milk', t: 'Your milk', d: 'Whole, oat or almond — same price.' },
          { icon: 'leaf', t: 'Compostable', d: 'Cups, lids and straws return to soil.' },
          { icon: 'timer', t: 'Ready in 8', d: 'Order ahead and walk straight in.' }
        ],

        howEyebrow: 'How it’s made',
        howTitle: 'From green bean to glass.',
        originsEyebrow: 'Origins',
        originsTitle: 'Where it comes from.',

        joinTitle: 'First pour, first to know.',
        joinText: 'New roasts, limited batches and the odd seasonal latte — one email a month, never more.',
        joinOkTitle: 'You’re on the list.',
        joinOkText: 'Thank you — your first email arrives with the next roast.',

        tagline: 'Small-batch iced lattes, poured slow.'
      },

      flavors: [
        { id: 'classic', name: 'Classic Kuro', price: 6, photo: null, layer: { top: '#D9B48A', bot: '#8A5634' },
          desc: 'Eighteen-hour cold-steeped espresso over whole milk and clear ice. Clean, round, quietly sweet.',
          notes: ['Dark cocoa', 'Toasted oat', 'Brown butter'] },
        { id: 'vanilla', name: 'Vanilla Bean', price: 7, photo: null, layer: { top: '#EBD3A8', bot: '#BB8B56' },
          desc: 'Madagascar vanilla seeds steeped into the milk, never a syrup. Soft and custardy.',
