/* Sanallaştırma Atölyesi — kütüphanesiz, çevrimdışı ders uygulaması. */
(() => {
  'use strict';

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const content = $('#lesson-content');
  if (!content) return;

  const iconPaths = {
    monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    layers: '<path d="m12 3 10 5-10 5L2 8Z"/><path d="m2 12 10 5 10-5M2 16l10 5 10-5"/>',
    box: '<path d="m12 3 9 5v9l-9 5-9-5V8Z"/><path d="m3 8 9 5 9-5m-9 5v9M7.5 5.5l9 5"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v4m6-4v4m-6 12v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',
    memory: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10v4m5-4v4m5-4v4M7 18v3m5-3v3m5-3v3"/>',
    drive: '<path d="m5 4-3 11v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4L19 4Z"/><path d="M2 15h20m-5 3h.01M6 18h7"/>',
    disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M6 10a6 6 0 0 1 4-4m4 12a6 6 0 0 0 4-4"/>',
    play: '<path d="m8 4 12 8-12 8Z"/>',
    reset: '<path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    shield: '<path d="m12 3 8 3v6c0 5-8 10-8 10S4 17 4 12V6Z"/><path d="m8 12 3 3 5-6"/>',
    flask: '<path d="M9 3h6m-5 0v6L4 19a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L14 9V3M7 15h10"/>',
    network: '<rect x="8" y="2" width="8" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
    globe: '<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>',
    folder: '<path d="M3 7V5a2 2 0 0 1 2-2h5l3 4h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6"/>',
    bulb: '<path d="M9 18h6m-5 4h4M8 14a7 7 0 1 1 8 0l-1 4H9Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    terminal: '<rect x="2" y="3" width="20" height="18" rx="3"/><path d="m6 8 4 4-4 4m7 0h5"/>',
    trophy: '<path d="M8 3h8v7a4 4 0 0 1-8 0ZM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 2v6m-4 1h8"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/>',
    file: '<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8m-8 4h6"/>',
    usb: '<path d="M12 22V3m-3 3 3-3 3 3M12 16l-6-4V9m6 4 6-4V6"/><circle cx="6" cy="7" r="2"/><rect x="16" y="2" width="4" height="4"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
  };
  const icon = (name, size = 22) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.box}</svg>`;
  const osIcon = (os, size = 30) => {
    if (os === 'windows') return `<svg class="os-icon" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M3 5l12-2v12H3Zm14-2 12-2v14H17ZM3 17h12v12L3 27Zm14 0h12v14l-12-2Z"/></svg>`;
    if (os === 'ubuntu') return `<svg class="os-icon" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.3"><circle cx="16" cy="16" r="9"/><circle cx="16" cy="4" r="3" fill="currentColor" stroke="#e77c45"/><circle cx="5.6" cy="22" r="3" fill="currentColor" stroke="#e77c45"/><circle cx="26.4" cy="22" r="3" fill="currentColor" stroke="#e77c45"/></svg>`;
    return `<svg class="os-icon" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M17 14c8-7 13 5 5 9-8 4-17-3-14-12 2-7 13-9 18-2 5 8-2 20-12 20M17 14c-5 0-5 8 0 8 5 1 8-6 4-9"/></svg>`;
  };
  const heading = (n, category, title, description) => `<header class="lesson-heading"><p class="eyebrow">DERS ${String(n).padStart(2, '0')} <span>·</span> ${category}</p><h1>${title}</h1><p class="lead">${description}</p></header>`;
  const concept = (symbol, tone, title, text) => `<div class="concept"><span class="concept-icon ${tone}">${icon(symbol)}</span><div><h3>${title}</h3><p>${text}</p></div></div>`;
  const insight = (text) => `<div class="insight">${icon('bulb', 21)}<p>${text}</p></div>`;
  const sourceLink = (url, label = 'Oracle dokümantasyonu') => `<a class="source-link" href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  const dots = '<span class="window-dots"><i></i><i></i><i></i></span>';
  const titles = ['Sanallaştırma Nedir?', 'Hypervisor Nedir?', 'VirtualBox Nedir?', 'ISO Dosyası Nedir?', 'Sanal Makine Oluşturma', 'Sanal Ağ Modları', 'Guest Additions', 'Mini Bilgi Yarışması'];
  const timers = new Set();
  const later = (callback, delay) => { const id = setTimeout(() => { timers.delete(id); callback(); }, delay); timers.add(id); return id; };
  const cancelTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
  let current = -1;
  let toastTimer;
  let visited = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem('sanallastirma-viewed') || '[]');
    if (Array.isArray(saved)) visited = new Set(saved.filter((value) => Number.isInteger(value) && value >= 0 && value < 8));
  } catch (_) { /* Özel gezinmede de ders çalışmaya devam eder. */ }
  const state = {
    intro: { index: 0, revealed: false, completed: false },
    vms: false,
    hypervisor: 'type2', layer: 'hypervisor',
    selectedVM: 'ubuntu', wizard: -1,
    pipeline: -1, pipelineRunning: false,
    sim: { created: false, name: 'Ubuntu Laboratuvarı', os: 'ubuntu', ram: 4, cpu: 2, disk: 40, iso: 'ubuntu', boot: 'idle', bootStep: 0, message: '' },
    network: 'nat', additions: false, clipboard: 'Merhaba, sanal dünya!', pasted: '', folder: false,
    quiz: { index: 0, answers: [], finished: false },
  };

  // Giriş: her soru önce tartışılır, ilerleyince cevabı açılır.
  const openingQuestions = [
    {
      icon: 'monitor',
      scenario: 'Bilgisayarınızda Windows var; derste Linux kullanmanız gerekiyor.',
      question: 'Windows’u silmeden Linux’u nasıl kullanabiliriz?',
      title: 'Bir bilgisayarda farklı işletim sistemleri.',
      answer: 'Sanal makine, mevcut işletim sistemimizin içinde başka bir işletim sistemi çalıştırmamızı sağlar. Böylece ana sistemimizi değiştirmeden farklı sistemleri öğrenebiliriz.',
    },
    {
      icon: 'cpu',
      scenario: 'Üç ayrı sunucu var ama her biri gücünün küçük bir bölümünü kullanıyor.',
      question: 'Bu işler için gerçekten üç fiziksel bilgisayar gerekli mi?',
      title: 'Eldeki kaynakları daha verimli kullanabiliriz.',
      answer: 'Yeterli kapasiteye sahip tek bir bilgisayarda birden fazla sanal sunucu çalıştırabiliriz. Bu yaklaşım donanım, elektrik ve bakım ihtiyacını azaltabilir.',
    },
    {
      icon: 'flask',
      scenario: 'Yeni sistem ayarlarını denemek istiyorsunuz ama günlük kullandığınız bilgisayarı bozmak istemiyorsunuz.',
      question: 'Denemelerimiz için ayrı bir bilgisayar ortamı oluşturabilir miyiz?',
      title: 'Deneylerimizi ayrı bir ortamda yapabiliriz.',
      answer: 'Sanal makine, denemeleri ana sistemden ayrı tutmamızı sağlar. Bu ayrım riski azaltır; paylaşılan klasörler ve ağ bağlantıları ise iki ortam arasında erişim sağlayabilir.',
    },
    {
      icon: 'reset',
      scenario: 'Bir güncelleme yaptınız ve az önce çalışan laboratuvar ortamınız bozuldu.',
      question: 'Her şeyi yeniden kurmadan önceki duruma dönebilir miyiz?',
      title: 'Denemeden önce bir dönüş noktası oluşturabiliriz.',
      answer: 'Değişiklikten önce alınan anlık görüntü (snapshot), sanal makineyi o duruma döndürmemize yardımcı olur. Anlık görüntü, fiziksel diskin bozulmasına karşı ayrı bir yedeğin yerini tutmaz.',
    },
    {
      icon: 'copy',
      scenario: 'Sınıfta herkesin program sürümleri ve ayarları farklı; dersin önemli bir kısmı kurulum sorunlarıyla geçiyor.',
      question: 'Herkes derse aynı başlangıç ortamıyla girebilir mi?',
      title: 'Hazır bir laboratuvarı çoğaltabiliriz.',
      answer: 'Önceden hazırlanmış bir sanal makinenin kopyalarıyla ortak bir başlangıç ortamı sağlayabiliriz. Öğrenciler kendi kopyalarında çalışarak kurulum farkları yerine dersin konusuna odaklanabilir.',
    },
    {
      icon: 'layers',
      scenario: 'İki uygulama, aynı yardımcı yazılımın birbiriyle uyumsuz sürümlerini istiyor.',
      question: 'İkisini de kullanmak için birinden vazgeçmek zorunda mıyız?',
      title: 'Her uygulamaya kendi çalışma ortamını verebiliriz.',
      answer: 'Uygulamaları ayrı sanal makinelerde, ihtiyaç duydukları sürümlerle çalıştırabiliriz. Bir sanal makinenin içindeki yazılım değişikliği diğerinin kurulu dosyalarını değiştirmez.',
    },
    {
      icon: 'box',
      scenario: 'Üzerinde saatlerce çalıştığınız kurulu ortamı başka bir bilgisayara taşımak istiyorsunuz.',
      question: 'Bütün kurulumları ve ayarları baştan yapmak şart mı?',
      title: 'Hazırladığımız bilgisayar ortamını taşıyabiliriz.',
      answer: 'Sanal makinenin diskini ve ayarlarını taşıyarak hazırlanmış ortamı başka bir bilgisayarda kullanabiliriz. Yeni bilgisayarda yeterli kaynak, uyumlu işlemci mimarisi ve sanallaştırma yazılımı bulunmalıdır.',
    },
    {
      icon: 'network',
      scenario: 'Bir sunucu ve iki istemciyle ağ deneyi yapacaksınız ama yalnızca bir bilgisayarınız var.',
      question: 'Üç ayrı bilgisayar almadan bu ağı kurabilir miyiz?',
      title: 'Tek bilgisayar, bütün bir ağ laboratuvarı.',
      answer: 'Birden fazla sanal makine oluşturup bunları sanal bir ağa bağlayabiliriz. Böylece sunucu ve istemcilerin iletişimini tek fiziksel bilgisayarda inceleyebiliriz.',
    },
    {
      icon: 'terminal',
      scenario: 'Kullanmanız gereken eski bir uygulama, yeni işletim sisteminizde çalışmıyor.',
      question: 'Sırf bu uygulama için eski bir bilgisayarı saklamalı mıyız?',
      title: 'Uyumlu bir eski çalışma ortamı oluşturabiliriz.',
      answer: 'Gerekli uyumluluk sağlanıyorsa eski işletim sistemini sanal makinede çalıştırabiliriz. Sanallaştırma, eski sistemin güvenlik açıklarını ortadan kaldırmaz; ağ erişimini sınırlamak gerekebilir.',
    },
    {
      icon: 'memory',
      scenario: 'Tek bilgisayarda çok sayıda sanal makine açmayı planlıyorsunuz.',
      question: 'Sanal makine oluşturunca yeni işlemci ve RAM de kazanır mıyız?',
      title: 'Yeni donanım üretmeyiz; mevcut kaynakları paylaşırız.',
      answer: 'Sanal makineler fiziksel bilgisayarın işlemci, bellek ve disk kaynaklarını paylaşır. Kapasite aşılırsa hem sanal makineler hem ana sistem yavaşlayabilir.',
    },
  ];

  function introNextHint() {
    if (!state.intro.revealed) return 'Cevabı birlikte açalım';
    return state.intro.index === openingQuestions.length - 1 ? 'Şimdi nasıl çalıştığını keşfedelim' : 'Sıradaki durumu düşünelim';
  }
  function introNextLabel() {
    if (!state.intro.revealed) return 'İlerle: bu sorunun cevabını göster';
    return state.intro.index === openingQuestions.length - 1 ? 'İlerle: ilk derse başla' : 'İlerle: sonraki soruyu göster';
  }
  function introAnswer() {
    if (!state.intro.revealed) return `<div class="intro-thinking">${icon('bulb', 27)}<div><strong>Önce fikirleri duyalım.</strong><p>Siz nasıl çözerdiniz? Sınıfça tartışın; hazır olduğunuzda “İlerle” ile cevabı açın.</p></div></div>`;
    const item = openingQuestions[state.intro.index];
    return `<div class="intro-answer-heading">${icon('check', 20)}<span>BİRLİKTE DEĞERLENDİRELİM</span></div><h3>${item.title}</h3><p>${item.answer}</p>${state.intro.index === openingQuestions.length - 1 ? '<p class="intro-takeaway">Farklı sistemler, ayrı deneme ortamları ve ortak donanım… Bu ihtiyaçları karşılayan teknolojinin adı <strong>sanallaştırma</strong>. Şimdi nasıl çalıştığını görelim.</p>' : ''}`;
  }
  function introCard() {
    const intro = state.intro;
    const item = openingQuestions[intro.index];
    return `<div class="intro-meta"><span class="tag purple">DÜŞÜNME SORUSU ${String(intro.index + 1).padStart(2, '0')} / 10</span><span class="intro-step-label">${intro.revealed ? 'Birlikte değerlendirelim' : 'Önce düşünelim'}</span></div>
      <div class="intro-progress" role="img" aria-label="10 sorunun ${intro.index + 1}. sorusundasınız">${openingQuestions.map((_, i) => `<span class="${i < intro.index ? 'done' : i === intro.index ? 'current' : ''}" aria-hidden="true"></span>`).join('')}</div>
      <div class="intro-scenario"><span class="intro-scenario-icon">${icon(item.icon, 25)}</span><p>${item.scenario}</p></div>
      <h2 id="intro-question" class="intro-question" tabindex="-1">${item.question}</h2>
      <div id="intro-answer" class="intro-answer ${intro.revealed ? 'is-revealed' : ''}" aria-live="polite" aria-atomic="true">${introAnswer()}</div>
      <div class="intro-actions"><button class="btn btn-secondary" data-action="intro-restart" ${intro.index === 0 && !intro.revealed ? 'disabled' : ''}>${icon('reset', 16)}Baştan düşün</button><div class="intro-next"><span>${introNextHint()}</span><button class="btn btn-primary" id="intro-advance" data-action="intro-next" aria-controls="intro-answer" aria-label="${introNextLabel()}">İlerle${icon('arrow', 18)}</button></div></div>`;
  }
  function introduction() {
    return `<header class="lesson-heading intro-heading"><p class="eyebrow">BAŞLAMADAN ÖNCE <span>·</span> BİRLİKTE DÜŞÜNELİM</p><h1>Önce ihtiyacı keşfet.<br><em>Sonra teknolojiyi.</em></h1><p class="lead">Sanallaştırmaya neden ihtiyaç duyarız? 10 günlük durum, 10 düşünme sorusu. Önce fikir üretelim; sonra cevapları birlikte açalım.</p></header><section id="intro-card" class="panel intro-card" aria-labelledby="intro-question">${introCard()}</section>`;
  }
  function refreshIntro(newQuestion = false) {
    if (newQuestion) {
      $('#intro-card').innerHTML = introCard();
      $('#intro-question').focus({ preventScroll: true });
    } else {
      // Cevap bölgesi yerinde güncellenir; soru ekranda kalır.
      const answer = $('#intro-answer');
      answer.classList.toggle('is-revealed', state.intro.revealed);
      answer.innerHTML = introAnswer();
      $('.intro-step-label').textContent = state.intro.revealed ? 'Birlikte değerlendirelim' : 'Önce düşünelim';
      $('.intro-next > span').textContent = introNextHint();
      $('#intro-advance').setAttribute('aria-label', introNextLabel());
      $('[data-action="intro-restart"]').disabled = state.intro.index === 0 && !state.intro.revealed;
    }
    updateLessonControls();
  }
  function advanceIntro() {
    if (!state.intro.revealed) {
      state.intro.revealed = true;
      refreshIntro();
    } else if (state.intro.index < openingQuestions.length - 1) {
      state.intro.index++;
      state.intro.revealed = false;
      refreshIntro(true);
    } else {
      state.intro.completed = true;
      renderLesson(0, { focus: true });
    }
  }
  function previousIntro() {
    if (state.intro.revealed) {
      state.intro.revealed = false;
      refreshIntro();
    } else if (state.intro.index > 0) {
      state.intro.index--;
      state.intro.revealed = true;
      refreshIntro(true);
    }
  }

  function lessonOne() {
    return `${heading(1, 'TEMELLER', 'Bir bilgisayar.<br><em>Birden fazla dünya.</em>', 'Bir bilgisayarın içinde başka bir bilgisayar çalıştırabilir miyiz? Sanallaştırma ile tanışın; cevabı birlikte keşfedelim.')}
      <div class="lesson-grid wide-visual"><section class="panel visual-panel"><div class="panel-heading"><div><span class="panel-label">İNTERAKTİF LABORATUVAR</span><h2 class="panel-title">Bir makine, üç işletim sistemi</h2></div><span class="chip green"><span class="status-dot"></span>Canlı simülasyon</span></div>
      <div class="lab-stage"><div class="monitor"><div class="monitor-topbar">${dots}<span>FİZİKSEL BİLGİSAYAR</span>${icon('monitor', 14)}</div><div class="monitor-screen" id="virtual-machines">${vmVisual()}</div><div class="hardware-bar"><span class="hardware-stat">${icon('cpu', 16)}<span>8 çekirdek <small>CPU</small></span></span><span class="hardware-stat">${icon('memory', 16)}<span>16 GB <small>RAM</small></span></span><span class="hardware-stat">${icon('drive', 16)}<span>512 GB <small>SSD</small></span></span></div></div><div class="monitor-stand"></div></div>
      <div class="visual-caption"><p id="vm-caption" aria-live="polite">${state.vms ? 'Üç ayrı sistem, aynı fiziksel kaynakları paylaşıyor.' : 'Tek bir fiziksel bilgisayar. İçindeki olasılıkları keşfedin.'}</p><button class="btn btn-primary" id="toggle-vms">${icon(state.vms ? 'reset' : 'play', 17)}${state.vms ? 'Başa dön' : 'Sanal makineleri başlat'}</button></div></section>
      <aside class="panel explanation-panel"><span class="section-kicker">ÖNCE MANTIĞINI ANLAYALIM</span><div class="concept-list">${concept('monitor', 'blue', 'Fiziksel bilgisayar', 'Elinizle dokunabildiğiniz gerçek makine. İşlemci, bellek ve disk gibi donanımlara sahiptir.')}${concept('box', 'purple', 'Sanal makine (VM)', 'Fiziksel bilgisayarın içinde, yazılımla oluşturulan ayrı bir bilgisayar. Kendi işletim sistemi vardır.')}${concept('layers', 'green', 'Kaynaklar ortak, sistemler ayrı', 'Sanal makineler donanımı paylaşır; her biri kendi uygulamalarını ve dosyalarını ayrı bir ortamda çalıştırır.')}</div>${insight('Bir apartman düşünün: <strong>bina fiziksel bilgisayar</strong>, bağımsız daireler sanal makineler.')}</aside></div>
      <div class="section-heading"><h2>Neden sanallaştırma?</h2><span>Birçok olasılık, tek bilgisayar.</span></div><div class="feature-grid"><article class="feature-card"><span class="feature-icon purple">${icon('flask')}</span><h3>Deneyerek öğren</h3><p>Farklı işletim sistemlerini kurun, ayarlarını keşfedin.</p></article><article class="feature-card"><span class="feature-icon blue">${icon('shield')}</span><h3>Ayrı bir ortamda çalış</h3><p>Denemelerinizi ana sistemden ayrı bir ortamda yapın.</p></article><article class="feature-card"><span class="feature-icon orange">${icon('cpu')}</span><h3>Kaynakları verimli kullan</h3><p>Her sistem için yeni bir fiziksel bilgisayar gerekmez.</p></article></div>`;
  }
  function vmVisual() {
    if (!state.vms) return `<div class="host-visual"><svg class="host-cube" viewBox="0 0 240 170" width="205" height="148" aria-hidden="true"><defs><linearGradient id="cube-top" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#bbabff"/><stop offset="1" stop-color="#8262e8"/></linearGradient><linearGradient id="cube-side" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#7957cf"/><stop offset="1" stop-color="#503494"/></linearGradient></defs><ellipse cx="120" cy="147" rx="71" ry="14" fill="#9b7dff" opacity=".08"/><path d="m120 24 63 35-63 35-63-35Z" fill="url(#cube-top)"/><path d="m57 59 63 35v64l-63-36Z" fill="url(#cube-side)"/><path d="m120 94 63-35v63l-63 36Z" fill="#6845ba"/><path d="m120 24 63 35v63l-63 36-63-36V59Z" stroke="#c1b0fa" stroke-opacity=".3" fill="none"/><path d="m120 41 33 18-33 19-33-19Z" fill="none" stroke="#e8ddff" stroke-width="1.5" opacity=".65"/><path d="m140 101 24-13m-24 26 24-13m-24 26 24-13" stroke="#c8b3ff" stroke-width="3" stroke-linecap="round" opacity=".65"/><circle cx="75" cy="104" r="3" fill="#bfa5ff"/></svg><span class="host-label">TEK BİR DONANIM <span>SONSUZ OLASILIK</span></span></div>`;
    return `<div class="vm-grid">${[['windows', 'Windows 11', '2 CPU · 4 GB RAM'], ['debian', 'Linux / Debian', '2 CPU · 2 GB RAM'], ['ubuntu', 'Ubuntu', '2 CPU · 4 GB RAM']].map(([os, name, resources], index) => `<article class="vm-card ${os}" style="--vm-delay:${index * 110}ms"><div class="vm-topline"><span class="vm-label">VM 0${index + 1}</span><i class="status-dot"></i></div><div class="vm-desktop">${osIcon(os, 38)}<div class="desktop-line"></div><div class="desktop-line short"></div><div class="desktop-taskbar"><i></i><i></i><i></i><i></i></div></div><h3>${name}</h3><p>${resources}</p><span class="vm-status">Çalışıyor</span></article>`).join('')}</div><div class="hypervisor-ribbon">${icon('layers', 15)}HYPERVISOR <span>·</span> Donanım kaynaklarını paylaştırır</div>`;
  }

  const layerInfo = {
    vms: { icon: 'box', title: 'Sanal makineler', text: 'Windows, Ubuntu veya başka bir konuk işletim sistemi burada çalışır. Her sanal makine kendi sanal işlemcisine, belleğine ve diskine sahip olduğunu görür.', badge: 'BİRBİRİNDEN AYRI ORTAMLAR' },
    hypervisor: { icon: 'layers', title: 'Hypervisor', text: 'Sanal makineleri oluşturur ve yönetir. Fiziksel işlemci, bellek ve disk kaynaklarına erişimlerini düzenler.', badge: 'KAYNAKLARI YÖNETEN KATMAN' },
    host: { icon: 'monitor', title: 'Ana işletim sistemi', text: 'Fiziksel bilgisayarınıza kurulu Windows, Linux veya macOS. Type 2 yapıda VirtualBox, bu sistemin üzerinde bir uygulama olarak çalışır.', badge: 'HOST İŞLETİM SİSTEMİ' },
    hardware: { icon: 'cpu', title: 'Fiziksel donanım', text: 'İşlemci, RAM, depolama ve ağ kartı gibi gerçek parçalar. En üstteki bütün sanal makinelerin kullandığı kaynakların asıl kaynağıdır.', badge: 'GERÇEK KAYNAKLAR' },
  };
  function lessonTwo() {
    const isType2 = state.hypervisor === 'type2';
    const layer = layerInfo[state.layer] || layerInfo.hypervisor;
    const layers = [['vms', 'Sanal makineler', 'Windows · Linux · Ubuntu', 'box'], ['hypervisor', isType2 ? 'VirtualBox · Hypervisor' : 'Type 1 Hypervisor', isType2 ? 'Ana sistem üzerinde çalışan uygulama' : 'Doğrudan donanım üzerinde', 'layers'], ...(isType2 ? [['host', 'Ana işletim sistemi', 'Windows / Linux / macOS', 'monitor']] : []), ['hardware', 'Fiziksel donanım', 'CPU · RAM · Disk · Ağ', 'cpu']];
    return `${heading(2, 'MİMARİ', 'Sahne arkasındaki<br><em>kaynak yöneticisi.</em>', 'Hypervisor, tek bir bilgisayarın kaynaklarını birden fazla sanal makineye paylaştıran yazılımdır.')}
      <div class="lesson-grid"><section class="panel"><div class="panel-heading"><div><span class="panel-label">KATMANLI MİMARİ</span><h2 class="panel-title">Bir katmana dokunun</h2></div></div><div class="segmented" aria-label="Hypervisor türü"><button data-hypervisor="type2" class="${isType2 ? 'active' : ''}" aria-pressed="${isType2}">Type 2 <span>VirtualBox</span></button><button data-hypervisor="type1" class="${!isType2 ? 'active' : ''}" aria-pressed="${!isType2}">Type 1 <span>Doğrudan donanım</span></button></div><div class="arch-stack">${layers.map(([id, name, desc, symbol], index) => `${index ? '<div class="arch-arrow">↕</div>' : ''}<button class="arch-layer ${id} ${state.layer === id ? 'selected' : ''}" data-layer="${id}" aria-pressed="${state.layer === id}"><span class="concept-icon ${id === 'hypervisor' ? 'purple' : id === 'vms' ? 'green' : 'blue'}">${icon(symbol, 25)}</span><span><strong>${name}</strong><small>${desc}</small></span><span class="layer-number">0${layers.length - index}</span></button>`).join('')}</div><p class="diagram-note">${isType2 ? 'VirtualBox bir Type 2 hypervisor’dır. Kişisel bilgisayarda öğrenmek ve denemek için kullanışlıdır.' : 'Type 1: örneğin VMware ESXi. Sunucu ortamlarında doğrudan donanımı yönetir.'}</p></section>
      <aside><div class="panel layer-detail" aria-live="polite"><span class="detail-icon purple">${icon(layer.icon, 32)}</span><span class="section-kicker">${layer.badge}</span><h2>${layer.title}</h2><p>${layer.text}</p><div class="tag purple">${state.layer === 'hypervisor' ? (isType2 ? 'Bu derste: Type 2 → VirtualBox' : 'Bu mimaride ana OS katmanı yok') : 'Katmanları tıklayarak keşfedin'}</div></div>${insight('<strong>Type 1:</strong> donanım → hypervisor → VM<br><strong>Type 2:</strong> donanım → ana OS → hypervisor → VM')}</aside></div>`;
  }

  const vmDetails = { ubuntu: { name: 'Ubuntu Laboratuvarı', os: 'Ubuntu (64-bit)', ram: '4096 MB', cpu: '2', disk: '40 GB', symbol: 'ubuntu' }, windows: { name: 'Windows Deneme', os: 'Windows 11 (64-bit)', ram: '6144 MB', cpu: '2', disk: '80 GB', symbol: 'windows' }, debian: { name: 'Debian Sunucu', os: 'Debian (64-bit)', ram: '2048 MB', cpu: '1', disk: '25 GB', symbol: 'debian' } };
  const wizardSteps = [
    ['Bir isim ve işletim sistemi seçin', 'Örneğin “Ubuntu Laboratuvarı”. Kuracağınız sistemin türünü ve sürümünü belirtin.', 'box'],
    ['Bellek ve işlemciyi ayarlayın', 'Ana bilgisayara da kaynak bırakın. Bu örnekte 4 GB RAM ve 2 sanal CPU kullanıyoruz.', 'cpu'],
    ['Sanal diski oluşturun', 'Sanal makinenin dosyalarını tutacak bir disk dosyası hazırlanır. Örnek kapasite: 40 GB.', 'drive'],
    ['ISO bağlayın ve başlatın', 'Kurulum medyasını sanal DVD sürücüsüne takın. Sanal makine açıldığında işletim sistemi kurulumu başlar.', 'disc'],
  ];
  function lessonThree() {
    const vm = vmDetails[state.selectedVM];
    return `${heading(3, 'ARAÇ KUTUSU', 'Sanal dünyalara açılan<br><em>kapınız: VirtualBox.</em>', 'Oracle VirtualBox ile bilgisayarınızda farklı işletim sistemlerini kurun, çalıştırın ve yönetin.')}
      <div class="lesson-grid wide-visual"><section class="panel"><div class="panel-heading"><div><span class="panel-label">ARAYÜZÜ TANIYIN</span><h2 class="panel-title">Sanal makine yöneticisi</h2></div><span class="chip">Temsili arayüz</span></div><div class="vbox-window"><div class="monitor-topbar">${dots}<span>Oracle VirtualBox</span></div><div class="vbox-toolbar"><span class="vbox-brand">${icon('box', 25)}VirtualBox</span><button class="btn btn-primary btn-small" id="new-vbox-vm">${icon('plus', 16)}Yeni sanal makine</button></div><div class="vbox-body"><div class="vbox-sidebar" aria-label="Örnek sanal makineler">${Object.entries(vmDetails).map(([key, item]) => `<button class="vbox-vm ${key === state.selectedVM ? 'selected' : ''}" data-vm="${key}" aria-pressed="${key === state.selectedVM}">${osIcon(item.symbol, 25)}<span><strong>${item.name}</strong><small><i class="status-dot off"></i>Kapalı</small></span></button>`).join('')}</div><div class="vbox-detail"><div class="vbox-section"><h3>${icon('info', 15)}Genel</h3><div class="vbox-spec"><span>Ad</span><strong>${vm.name}</strong></div><div class="vbox-spec"><span>İşletim sistemi</span><strong>${vm.os}</strong></div></div><div class="vbox-section"><h3>${icon('cpu', 15)}Sistem</h3><div class="vbox-spec"><span>Ana bellek</span><strong>${vm.ram}</strong></div><div class="vbox-spec"><span>İşlemci</span><strong>${vm.cpu} CPU</strong></div></div><div class="vbox-section"><h3>${icon('drive', 15)}Depolama</h3><div class="vbox-spec"><span>Sanal disk</span><strong>${vm.disk} · VDI</strong></div></div><div class="mini-desktop ${vm.symbol}">${osIcon(vm.symbol, 35)}<span>${vm.name}</span><small>ÖNİZLEME</small></div></div></div></div><div id="vbox-wizard" aria-live="polite">${wizardVisual()}</div></section>
      <aside class="panel explanation-panel"><span class="section-kicker">MASAÜSTÜ LABORATUVARINIZ</span><div class="concept-list">${concept('flask', 'purple', 'Kur, dene, keşfet', 'Yeni sistemleri öğrenmek, yazılım test etmek ve ağ laboratuvarları oluşturmak için kullanılır.')}${concept('globe', 'green', 'Farklı konuk sistemler', 'Windows, Ubuntu, Debian ve diğer desteklenen sistemler. Ubuntu ve Debian, Linux dağıtımlarıdır. Uygun sürüm ve işlemci mimarisi gerekir.')}${concept('box', 'blue', 'Temel paket ücretsiz', 'VirtualBox temel paketi GPLv3 lisanslı açık kaynak yazılımdır. Extension Pack ayrı lisansa sahiptir; kullanım koşulları farklıdır.')}</div>${insight('VirtualBox bilgisayarı oluşturur. <strong>İşletim sistemini ayrıca kurarsınız.</strong> Konuk sistemin kendi lisans koşulları geçerlidir.')}${sourceLink('https://www.virtualbox.org/wiki/Licensing_FAQ', 'VirtualBox lisans bilgisi')}</aside></div>`;
  }
  function wizardVisual() {
    if (state.wizard < 0) return '<p class="diagram-note">Soldan bir makine seçin veya “Yeni sanal makine” ile oluşturma adımlarını keşfedin.</p>';
    const [title, text, symbol] = wizardSteps[state.wizard];
    return `<div class="wizard-card"><div class="wizard-steps">${wizardSteps.map((_, i) => `<span class="wizard-step ${i === state.wizard ? 'active' : i < state.wizard ? 'done' : ''}">${i + 1}</span>`).join('')}<span>ADIM ${state.wizard + 1} / 4</span><button class="btn btn-icon" data-action="close-wizard" aria-label="Adımları kapat">${icon('close', 17)}</button></div><div class="concept"><span class="concept-icon purple">${icon(symbol)}</span><div><h3>${title}</h3><p>${text}</p></div></div><div class="actions">${state.wizard > 0 ? '<button class="btn btn-secondary btn-small" data-action="wizard-back">Geri</button>' : ''}<button class="btn btn-primary btn-small" data-action="wizard-next">${state.wizard === 3 ? 'Simülatörde kendin dene' : 'Sonraki adım'}${icon('arrow', 15)}</button></div></div>`;
  }

  const pipelineStages = [['file', 'ISO dosyası', 'Kurulum imajı'], ['disc', 'Sanal DVD', 'ISO bağlanır'], ['box', 'Sanal makine', 'Medyadan açılır'], ['check', 'OS kurulumu', 'Diske kurulur']];
  function lessonFour() {
    return `${heading(4, 'KURULUM MEDYASI', 'Bir diskin içeriği.<br><em>Tek bir dosyada.</em>', 'ISO, bir optik diskin içeriğini ve dosya sistemi yapısını taşıyan disk imajıdır. Kurulum medyası olarak kullanılabilir.')}
      <div class="lesson-grid wide-visual"><section class="panel"><div class="panel-heading"><div><span class="panel-label">KURULUMUN YOLCULUĞU</span><h2 class="panel-title">Dosyadan işletim sistemine</h2></div><span class="chip purple">.iso</span></div><div class="iso-pipeline" id="iso-pipeline">${pipelineVisual()}</div><div class="pipeline-status" id="pipeline-status" role="status">Kurulum ISO’sunun yolculuğunu başlatın.</div><div class="actions"><button class="btn btn-primary" id="animate-iso">${icon('play', 17)}ISO’yu bağla ve izle</button><button class="btn btn-secondary" data-action="reset-iso">${icon('reset', 17)}Sıfırla</button></div><div class="media-row"><span>${icon('disc', 23)}Fiziksel DVD</span><span>↔</span><span>${icon('file', 23)}ISO imajı</span><span>→</span><span>${icon('usb', 23)}USB’ye yazılabilir</span></div><p class="diagram-note">Fiziksel bilgisayar için ISO uygun bir araçla USB’ye yazılabilir. VirtualBox’ta ise dosyayı doğrudan sanal DVD sürücüsüne bağlarız.</p></section>
      <aside class="panel"><span class="section-kicker">ISO VE EXE AYNI ŞEY Mİ?</span><div class="file-comparison"><article class="file-card"><span class="file-symbol purple">${icon('disc', 27)}</span><div><h3>ubuntu.iso</h3><span class="tag purple">DİSK İMAJI</span><p>Bir diskin yapısını ve içeriğini taşır. Bağlanır veya uygun biçimde medyaya yazılır.</p></div></article><article class="file-card"><span class="file-symbol blue">${icon('terminal', 27)}</span><div><h3>uygulama.exe</h3><span class="tag blue">ÇALIŞTIRILABİLİR DOSYA</span><p>Windows’ta çalışan programdır. Bir uygulama veya kurulum aracı olabilir.</p></div></article></div>${insight('<strong>Her ISO önyüklenebilir değildir.</strong> İşletim sistemi kurmak için uygun, önyüklenebilir bir kurulum ISO’su gerekir.')}</aside></div>`;
  }
  function pipelineVisual() {
    return pipelineStages.map(([symbol, title, subtitle], i) => `${i ? `<span class="pipeline-link ${state.pipeline >= i ? 'active' : ''}">${icon('arrow', 20)}</span>` : ''}<div class="pipeline-node ${i === state.pipeline ? 'active' : i < state.pipeline ? 'done' : ''}"><span class="pipeline-icon">${icon(symbol, 33)}</span><small>0${i + 1}</small><h3>${title}</h3><p>${subtitle}</p></div>`).join('');
  }
  function animateISO() {
    if (state.pipelineRunning) return;
    state.pipelineRunning = true;
    const button = $('#animate-iso');
    button.disabled = true;
    button.innerHTML = `${icon('disc', 17)}Kurulum yolu gösteriliyor…`;
    const descriptions = ['1 / 4 — Önyüklenebilir Ubuntu kurulum ISO’su seçildi.', '2 / 4 — ISO, VirtualBox’ın sanal DVD sürücüsüne bağlandı.', '3 / 4 — Sanal makine açıldı ve kurulum medyasından önyüklendi.', '4 / 4 — Kurulum programı işletim sistemini sanal diske kurabilir.'];
    const step = (index) => {
      state.pipeline = index;
      $('#iso-pipeline').innerHTML = pipelineVisual();
      $('#pipeline-status').textContent = descriptions[index];
      if (index < 3) later(() => step(index + 1), 1400);
      else { state.pipelineRunning = false; button.disabled = false; button.innerHTML = `${icon('reset', 17)}Yeniden izle`; }
    };
    step(0);
  }

  const osNames = { ubuntu: 'Ubuntu', windows: 'Windows 11', debian: 'Debian' };
  const isoNames = { ubuntu: 'ubuntu-desktop-amd64.iso', windows: 'windows-11-x64.iso', debian: 'debian-amd64-netinst.iso' };
  const bootMessages = ['Sanal donanım hazırlanıyor…', 'Önyüklenebilir ISO algılandı…', 'İşletim sistemi kurucusu başlatılıyor…', 'Örnek kurulum tamamlanıyor…'];
  function resource(label, value, total, unit, tone) {
    return `<div class="resource-row"><span>${label}</span><strong>${value} ${unit}<small> / ${total} ${unit}</small></strong></div><div class="resource-meter"><div class="resource-fill ${tone}" style="width:${Math.min(100, value / total * 100)}%"></div></div>`;
  }
  function lessonFive() {
    const sim = state.sim;
    return `${heading(5, 'UYGULAMA ZAMANI', 'İlk sanal makinenizi<br><em>birlikte oluşturalım.</em>', 'İşletim sistemini seçin, kaynakları ayarlayın, ISO’yu bağlayın. Sonra sanal makinenizi başlatın.')}
      <div class="simulator"><section class="panel sim-form"><div class="sim-header"><div><span class="panel-label">VIRTUALBOX SİMÜLATÖRÜ</span><h2 class="panel-title">Makine yapılandırması</h2></div><button class="btn btn-secondary btn-small" data-action="new-sim">${icon('plus', 16)}${sim.created ? 'Yeni makine' : '1. Yeni makine'}</button></div><div class="setup-steps" aria-label="Oluşturma adımları">${['Yeni', 'OS', 'RAM', 'CPU', 'Disk', 'ISO', 'Başlat'].map((label, i) => `<span class="setup-step ${sim.created && i === 0 ? 'done' : sim.boot === 'ready' ? 'done' : sim.created && i === 6 ? 'current' : ''}"><b>${i + 1}</b>${label}</span>`).join('')}</div>
      ${!sim.created ? '<p class="sim-warning">Başlamak için “1. Yeni makine” düğmesine tıklayın.</p>' : ''}<fieldset class="sim-fieldset" ${sim.created ? '' : 'disabled'}><legend class="sr-only">Sanal makine ayarları</legend><div class="form-row"><label class="field-label" for="vm-name">Makine adı</label><input id="vm-name" maxlength="40" value="${escapeHTML(sim.name)}" autocomplete="off" placeholder="Örn. Ubuntu Laboratuvarı"></div><div class="form-row"><label class="field-label" for="vm-os"><span class="step-dot">2</span> İşletim sistemi</label><select id="vm-os">${Object.entries(osNames).map(([key, label]) => `<option value="${key}" ${sim.os === key ? 'selected' : ''}>${label} (64-bit)</option>`).join('')}</select></div>
      <div class="form-row range-field"><label class="field-label" for="vm-ram"><span><span class="step-dot">3</span> RAM belleği</span><output for="vm-ram" id="ram-output">${sim.ram} GB</output></label><input id="vm-ram" type="range" min="1" max="12" step="1" value="${sim.ram}"><div class="range-labels"><span>1 GB</span><span>Ana bilgisayar: 16 GB</span><span>12 GB</span></div></div>
      <div class="form-row range-field"><label class="field-label" for="vm-cpu"><span><span class="step-dot">4</span> İşlemci</span><output for="vm-cpu" id="cpu-output">${sim.cpu} CPU</output></label><input id="vm-cpu" type="range" min="1" max="6" step="1" value="${sim.cpu}"><div class="range-labels"><span>1 CPU</span><span>Ana bilgisayar: 8 CPU</span><span>6 CPU</span></div></div>
      <div class="form-row range-field"><label class="field-label" for="vm-disk"><span><span class="step-dot">5</span> Sanal disk kapasitesi</span><output for="vm-disk" id="disk-output">${sim.disk} GB</output></label><input id="vm-disk" type="range" min="20" max="120" step="5" value="${sim.disk}"><div class="range-labels"><span>20 GB</span><span>Ana disk: 512 GB</span><span>120 GB</span></div></div>
      <div class="form-row"><label class="field-label" for="vm-iso"><span class="step-dot">6</span> Kurulum ISO’su <span class="tag">Örnek dosyalar</span></label><select id="vm-iso"><option value="">ISO seçilmedi</option>${Object.entries(isoNames).map(([key, label]) => `<option value="${key}" ${sim.iso === key ? 'selected' : ''}>${label}</option>`).join('')}</select></div><button class="btn btn-primary sim-start" id="start-sim" ${sim.boot === 'booting' || sim.boot === 'ready' ? 'disabled' : ''}>${icon('play', 17)}7. Sanal makineyi başlat</button></fieldset><p class="sim-warning" id="sim-message" aria-live="polite">${escapeHTML(sim.message || 'Bu bir eğitim simülasyonudur. Bilgisayarınıza dosya veya işletim sistemi kurulmaz.')}</p></section>
      <section class="panel sim-preview"><div class="panel-heading"><div><span class="panel-label">CANLI ÖNİZLEME</span><h2 class="panel-title" id="sim-preview-name">${escapeHTML(sim.created ? sim.name : 'Yeni makineniz burada görünecek')}</h2></div><span class="chip" id="sim-status">${sim.boot === 'ready' ? 'Çalışıyor' : sim.boot === 'booting' ? 'Başlatılıyor' : 'Kapalı'}</span></div><div class="boot-screen" id="boot-screen">${bootVisual()}</div><div class="sim-summary" id="sim-resources">${simResources()}</div>${insight('<strong>Ana bilgisayara da kaynak bırakın.</strong> VM’ye ayırdığınız RAM ve işlemci, diğer uygulamaların kullanabileceği kaynakları etkiler.')}<p class="diagram-note">Disk çubuğu seçilen sanal kapasiteyi gösterir. Dinamik bir sanal disk, fiziksel diskte başlangıçta bu kapasitenin tamamını kullanmaz.</p></section></div>`;
  }
  function simResources() {
    const sim = state.sim;
    return resource('RAM belleği', sim.ram, 16, 'GB', 'purple') + resource('Sanal işlemci', sim.cpu, 8, 'CPU', 'blue') + resource('Sanal disk kapasitesi', sim.disk, 512, 'GB', 'green');
  }
  function bootVisual() {
    const sim = state.sim;
    if (sim.boot === 'ready') return `<div class="boot-desktop ${sim.os}"><div class="desktop-topbar"><span>${osNames[sim.os]}</span><span>ÖRNEK MASAÜSTÜ</span></div><div class="desktop-welcome">${osIcon(sim.os, 55)}<h3>Merhaba, ${osNames[sim.os]}!</h3><p>${escapeHTML(sim.name)}</p><span class="tag green">${icon('check', 13)} Simülasyon hazır</span></div><div class="desktop-dock">${icon('folder', 22)}${icon('globe', 22)}${icon('terminal', 22)}${icon('box', 22)}</div></div>`;
    if (sim.boot === 'booting') return `<div class="boot-log">${icon('terminal', 29)}<span>VIRTUALBOX · SİMÜLASYON</span>${bootMessages.slice(0, sim.bootStep + 1).map((message, i) => `<p><b>${i < sim.bootStep ? '✓' : '›'}</b> ${message}</p>`).join('')}<div class="boot-progress"><i style="width:${(sim.bootStep + 1) * 25}%"></i></div></div>`;
    return `<div class="boot-idle">${icon(sim.created ? 'box' : 'monitor', 54)}<h3>${sim.created ? 'Makineniz açılmaya hazır' : 'Henüz bir makine yok'}</h3><p>${sim.created ? 'Kaynakları ayarlayın ve başlat düğmesine basın.' : 'Yeni makine oluşturun ve ilk adımı atın.'}</p><span class="tag">${sim.created ? osNames[sim.os] + ' · 64-bit' : 'EĞİTİM SİMÜLASYONU'}</span></div>`;
  }
  function refreshSimPreview() {
    const sim = state.sim;
    $('#sim-preview-name').textContent = sim.created ? sim.name || 'İsimsiz makine' : 'Yeni makineniz burada görünecek';
    $('#sim-resources').innerHTML = simResources();
    $('#boot-screen').innerHTML = bootVisual();
    $('#sim-status').textContent = sim.boot === 'ready' ? 'Çalışıyor' : sim.boot === 'booting' ? 'Başlatılıyor' : 'Kapalı';
    $('#sim-status').classList.toggle('green', sim.boot === 'ready');
    $('#sim-message').textContent = sim.message || 'Bu bir eğitim simülasyonudur. Bilgisayarınıza dosya veya işletim sistemi kurulmaz.';
    $('#start-sim').disabled = !sim.created || sim.boot === 'booting' || sim.boot === 'ready';
    ['ram', 'cpu', 'disk'].forEach((key) => { $(`#${key}-output`).textContent = sim[key] + (key === 'cpu' ? ' CPU' : ' GB'); });
  }
  function startSim() {
    const sim = state.sim;
    if (!sim.created || sim.boot !== 'idle') return;
    if (!sim.name.trim()) { sim.message = 'Makinenize bir ad verin.'; refreshSimPreview(); $('#vm-name').focus(); return; }
    if (!sim.iso) { sim.message = 'Kurulumu başlatmak için bir ISO seçin.'; refreshSimPreview(); $('#vm-iso').focus(); return; }
    if (sim.iso !== sim.os) { sim.message = `Seçtiğiniz işletim sistemi ${osNames[sim.os]}. Eşleşen kurulum ISO’sunu seçin.`; refreshSimPreview(); $('#vm-iso').focus(); return; }
    if (sim.os === 'windows' && (sim.ram < 4 || sim.cpu < 2 || sim.disk < 64)) { sim.message = 'Bu Windows 11 senaryosu için en az 4 GB RAM, 2 CPU ve 64 GB disk seçin. Gerçek kurulumun başka gereksinimleri de vardır.'; refreshSimPreview(); return; }
    sim.boot = 'booting'; sim.bootStep = 0;
    sim.message = 'Açılış ve kurulum hızlandırılmış olarak canlandırılıyor. Gerçek kurulum daha fazla adım ve zaman gerektirir.';
    refreshSimPreview();
    const tick = () => {
      if (sim.bootStep < 3) { sim.bootStep++; refreshSimPreview(); later(tick, 1200); }
      else { sim.boot = 'ready'; sim.message = 'Harika! Sanal makineniz simülasyonda çalışıyor. Bir ayarı değiştirerek yeniden deneyebilirsiniz.'; refreshSimPreview(); $$('.setup-step', content).forEach((el) => { el.classList.add('done'); el.classList.remove('current'); }); }
    };
    later(tick, 1200);
  }

  const networkInfo = {
    nat: { name: 'NAT', eyebrow: 'ANA BİLGİSAYAR ÜZERİNDEN', title: 'Dışarı çıkarken ana bilgisayarı kullanır.', description: 'VM, VirtualBox’ın sanal NAT yönlendiricisi üzerinden dış ağa erişir. Yerel ağdaki cihazlar VM’ye varsayılan olarak doğrudan bağlantı başlatamaz.', chips: ['İnternet erişimi ✓', 'Yerel ağdan doğrudan erişim yok'], note: 'Varsayılan NAT modunda ayrı VM’ler genellikle birbirine doğrudan erişemez. “NAT Network” ayrı bir moddur; gelen bağlantılar için port yönlendirme yapılabilir.' },
    bridged: { name: 'Bridged Adapter', eyebrow: 'YEREL AĞIN AYRI BİR ÜYESİ', title: 'VM, ağda ayrı bir cihaz gibi görünür.', description: 'Sanal makine, ana bilgisayarın ağ kartı üzerinden fiziksel yerel ağa bağlanır. LAN’dan kendi IP adresini alabilir ve ağdaki diğer cihazlarla iletişim kurabilir.', chips: ['Ayrı LAN adresi ✓', 'İnternet: ağ izin veriyorsa ✓'], note: 'NAT’ta VM, çeviri yapılan özel bir ağdadır. Bridged modunda ana bilgisayar ve VM aynı fiziksel ağın ayrı üyeleridir. Erişim, ağ ve güvenlik duvarı kurallarına bağlıdır.' },
    hostonly: { name: 'Host-only Adapter', eyebrow: 'BİLGİSAYARINIZ İÇİNDE ÖZEL AĞ', title: 'Ana bilgisayar + sanal makineler.', description: 'Ana bilgisayar ve aynı host-only ağa bağlı VM’ler birbirleriyle iletişim kurar. Bu ağ tek başına internete çıkış sağlamaz.', chips: ['Host ↔ VM ✓', 'VM ↔ VM ✓', 'İnternet yok'], note: 'Ana bilgisayardan erişmek istediğiniz kapalı bir laboratuvar için kullanışlıdır. Başka bir ağ bağdaştırıcısı veya yönlendirme ayrıca eklenebilir.' },
    internal: { name: 'Internal Network', eyebrow: 'YALNIZCA SANAL MAKİNELER', title: 'Sadece aynı iç ağdaki VM’ler.', description: 'Aynı iç ağ adını kullanan sanal makineler haberleşir. Ana bilgisayar bu ağa üye olmaz; bu ağ tek başına internete bağlı değildir.', chips: ['VM ↔ VM ✓', 'Host erişimi yok', 'İnternet yok'], note: 'Host-only’den farkı: ana bilgisayar da bu özel ağın dışındadır. Birbirleriyle konuşan izole sanal sistemleri denemek için uygundur.' },
  };
  function lessonSix() {
    const net = networkInfo[state.network];
    return `${heading(6, 'BAĞLANTILAR', 'Sanal makineniz<br><em>dünyaya nasıl bağlanır?</em>', 'Aynı sanal makine, farklı ağ davranışları. Bir mod seçin ve veri paketlerinin izlediği yolu görün.')}
      <div class="segmented network-tabs" aria-label="Sanal ağ modu">${Object.entries(networkInfo).map(([key, item]) => `<button data-network="${key}" class="${key === state.network ? 'active' : ''}" aria-pressed="${key === state.network}">${item.name}</button>`).join('')}</div><div class="lesson-grid wide-visual"><section class="panel"><div class="panel-heading"><div><span class="panel-label">VERİ PAKETLERİNİN YOLU</span><h2 class="panel-title">${net.name}</h2></div><span class="chip green"><span class="status-dot"></span>Ağ simülasyonu</span></div><div class="network-stage">${networkSVG(state.network)}</div><div class="network-legend"><span><i class="legend-dot purple"></i>Sanal makine</span><span><i class="legend-dot blue"></i>Ana bilgisayar / ağ</span><span><i class="legend-dot green"></i>Veri paketi</span></div></section><aside class="panel network-summary"><span class="section-kicker">${net.eyebrow}</span><h2>${net.title}</h2><p>${net.description}</p><div class="network-tags">${net.chips.map((text) => `<span class="tag">${text}</span>`).join('')}</div><div class="network-note">${icon('info', 20)}<p>${net.note}</p></div>${sourceLink('https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/networkingdetails.html')}</aside></div>`;
  }
  function networkSVG(mode) {
    const node = (x, y, width, label, sub, type, color = '#a98aff', faded = false) => `<g opacity="${faded ? '.4' : '1'}"><rect x="${x}" y="${y}" width="${width}" height="83" rx="14" fill="#171c2b" stroke="${color}" stroke-opacity=".6"/><svg x="${x + width / 2 - 12}" y="${y + 10}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${iconPaths[type]}</svg><text x="${x + width / 2}" y="${y + 51}" fill="#eeedf8" font-size="13" font-weight="650" text-anchor="middle">${label}</text><text x="${x + width / 2}" y="${y + 69}" fill="#8b94aa" font-size="11" text-anchor="middle">${sub}</text></g>`;
    const path = (d, delay = 0) => `<path d="${d}" fill="none" stroke="#7760ae" stroke-width="2" stroke-dasharray="5 5"/>${window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '' : `<circle r="4" fill="#7be0bc"><animateMotion dur="3s" begin="${delay}s" repeatCount="indefinite" path="${d}"/></circle>`}`;
    const label = (x, y, text, color = '#8992a6') => `<text x="${x}" y="${y}" fill="${color}" font-size="11" font-weight="600" letter-spacing="1" text-anchor="middle">${text}</text>`;
    let drawing = '';
    if (mode === 'nat') drawing = `<rect x="25" y="65" width="450" height="226" rx="20" fill="#8970dd" fill-opacity=".035" stroke="#514766" stroke-dasharray="5 5"/>${label(250, 91, 'FİZİKSEL BİLGİSAYAR')}${path('M186 180 L276 180')}${path('M436 180 L536 180', 1.3)}${node(46, 139, 140, 'Sanal makine', '10.0.2.15 · özel IP', 'box')}${node(276, 139, 160, 'VirtualBox NAT', 'Ana sistem üzerinden', 'network', '#7ea9f0')}${node(536, 139, 137, 'İnternet', 'Dış ağ', 'globe', '#7be0bc')}${label(230, 170, 'VM → NAT')}${label(485, 170, '→')}${label(250, 268, 'LAN, VM’NİN ÖZEL IP ADRESİNİ GÖRMEZ')}`;
    if (mode === 'bridged') drawing = `${path('M166 107 L320 107 L320 177 L380 177')}${path('M166 252 L320 252 L320 177 L380 177', 1)}${path('M515 177 L567 177', 1.5)}${node(25, 65, 141, 'Ana bilgisayar', '192.168.1.10', 'monitor', '#7ea9f0')}${node(25, 210, 141, 'Sanal makine', '192.168.1.11', 'box')}${node(380, 135, 135, 'LAN / yönlendirici', '192.168.1.1', 'network', '#7ea9f0')}${node(567, 135, 128, 'İnternet', 'Ağ izin verirse', 'globe', '#7be0bc')}${label(215, 326, 'AYNI YEREL AĞDA, İKİ AYRI CİHAZ')}${label(240, 94, 'HOST')}${label(240, 239, 'VM')}`;
    if (mode === 'hostonly') drawing = `<rect x="20" y="55" width="478" height="249" rx="20" fill="#8970dd" fill-opacity=".035" stroke="#514766" stroke-dasharray="5 5"/>${label(260, 81, 'HOST-ONLY AĞI')}${path('M170 182 L264 182 L264 140 L337 140')}${path('M170 182 L264 182 L264 250 L337 250', 1)}${node(35, 141, 135, 'Ana bilgisayar', '192.168.56.1', 'monitor', '#7ea9f0')}${node(337, 99, 140, 'Sanal makine 1', '192.168.56.10', 'box')}${node(337, 209, 140, 'Sanal makine 2', '192.168.56.11', 'box')}${node(550, 141, 135, 'İnternet', 'Bağlantı yok', 'globe', '#8992a6', true)}<path d="M505 182h30" stroke="#7c6071" stroke-dasharray="4 5"/><path d="m513 175 14 14m-14 0 14-14" stroke="#e5949f" stroke-width="2"/>`;
    if (mode === 'internal') drawing = `<rect x="207" y="57" width="310" height="248" rx="20" fill="#8970dd" fill-opacity=".035" stroke="#695389" stroke-dasharray="5 5"/>${label(362, 85, 'İÇ AĞ: “DERS-LAB”')}${path('M362 178 L362 211')}${node(292, 95, 140, 'Sanal makine 1', '10.10.0.10', 'box')}${node(292, 211, 140, 'Sanal makine 2', '10.10.0.11', 'box')}${node(25, 141, 140, 'Ana bilgisayar', 'Bu ağın dışında', 'monitor', '#8992a6', true)}${node(555, 141, 135, 'İnternet', 'Bağlantı yok', 'globe', '#8992a6', true)}<path d="m181 175 14 14m-14 0 14-14m333-14 14 14m-14 0 14-14" stroke="#e5949f" stroke-width="2"/>`;
    return `<svg viewBox="0 0 720 355" role="img" aria-label="${escapeHTML(networkInfo[mode].description)}" style="font-family:inherit">${drawing}</svg>`;
  }

  function guestDesktop(large, active = true) {
    return `<div class="screen-frame"><div class="monitor-topbar">${dots}<span>Ubuntu · ${large && active ? '1920 × 1080' : '800 × 600'}</span></div><div class="guest-screen ${large && active ? 'large' : 'small'}"><div class="desktop-topbar"><span>Etkinlikler</span><span>Ubuntu</span></div><div class="guest-wallpaper">${osIcon('ubuntu', large ? 50 : 31)}<span>${large && active ? 'Ekran pencereye uyum sağlıyor' : 'Sabit, küçük çalışma alanı'}</span></div><div class="desktop-dock">${icon('folder', 16)}${icon('globe', 16)}${icon('terminal', 16)}</div></div></div>`;
  }
  function lessonSeven() {
    return `${heading(7, 'DAHA İYİ BİR DENEYİM', 'Sanal makinenizle<br><em>aynı dili konuşun.</em>', 'Guest Additions, konuk işletim sistemine kurulan sürücü ve yardımcı araçlardır. Ana sistemle daha rahat çalışmayı sağlar.')}
      <div class="comparison-grid"><section class="panel comparison-panel before"><div class="comparison-top"><span class="tag">ÖNCESİ</span><h2>Temel deneyim</h2><span class="chip">Guest Additions yok</span></div>${guestDesktop(false)}<ul class="comparison-points"><li>Sabit ekran çözünürlüğü</li><li>Paylaşılan pano kapalı</li><li>Paylaşılan klasör kullanılmıyor</li></ul></section><section class="panel comparison-panel after ${state.additions ? 'installed' : ''}"><div class="comparison-top"><span class="tag purple">SONRASI</span><h2>Uyumlu çalışma alanı</h2><button class="btn ${state.additions ? 'btn-secondary' : 'btn-primary'} btn-small" id="install-additions" aria-pressed="${state.additions}">${icon(state.additions ? 'reset' : 'plus', 15)}${state.additions ? 'Karşılaştırmayı sıfırla' : 'Guest Additions kur'}</button></div>${guestDesktop(true, state.additions)}<p class="diagram-note" id="additions-status" aria-live="polite">${state.additions ? 'Simülasyonda kuruldu: ekran uyumu ve örnek paylaşım ayarları etkin.' : 'Kur düğmesine basın, farkı ekranda görün.'}</p></section></div>
      <div class="demo-tools"><section class="panel demo-tool"><div class="concept"><span class="concept-icon blue">${icon('copy')}</span><div><h3>Paylaşılan pano</h3><p>Ana bilgisayardaki örnek metni konuk sisteme aktarın.</p></div></div><div class="clipboard-row"><label class="sr-only" for="clipboard-input">Ana bilgisayardaki metin</label><input id="clipboard-input" maxlength="100" value="${escapeHTML(state.clipboard)}" placeholder="Bir metin yazın"><button class="btn btn-secondary" data-action="copy-guest" ${state.additions ? '' : 'disabled'}>${icon('arrow', 17)}VM’ye aktar</button></div><div class="folder-result" id="clipboard-result" aria-live="polite">${state.pasted ? `<span class="tag green">KONUK PANO</span> ${escapeHTML(state.pasted)}` : 'Aktarılan metin burada görünecek.'}</div></section><section class="panel demo-tool"><div class="concept"><span class="concept-icon orange">${icon('folder')}</span><div><h3>Paylaşılan klasör</h3><p>Ana sistemin seçilen klasörüne konuk sistemden erişin.</p></div></div><button class="btn btn-secondary" data-action="open-folder" ${state.additions ? '' : 'disabled'}>${icon('folder', 18)}ders-dosyalari klasörünü aç</button><div class="folder-result" id="folder-result" aria-live="polite">${state.folder ? `${icon('file', 17)} ders-notlari.pdf <span class="tag green">Ana sistemle ortak</span>` : 'Örnek klasörü açmak için Guest Additions’ı kurun.'}</div></section></div>${insight('Gerçekte Guest Additions’ı <strong>konuk sistemin içine kurar</strong>, paylaşılan pano ve klasörleri ayrıca yapılandırırsınız. Buradaki kurulum ve dosya aktarımı birer görsel simülasyondur.')}${sourceLink('https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/guestadditions.html')}`;
  }

  const questions = [
    { question: 'Sanal makine (VM) nedir?', choices: ['Yeni satın alınan fiziksel bir bilgisayar', 'Yazılımla oluşturulan, kendi işletim sistemini çalıştırabilen bilgisayar', 'Sadece internet tarayıcısında açılan bir sayfa', 'İşlemciyi soğutan bir donanım'], answer: 1, explain: 'Sanal makine, fiziksel bilgisayarın kaynaklarını kullanarak ayrı bir bilgisayar gibi çalışır.' },
    { question: 'Hypervisor’ın temel görevi nedir?', choices: ['İnternet hızını artırmak', 'Sadece ISO dosyalarını indirmek', 'Sanal makineleri ve donanım kaynaklarına erişimlerini yönetmek', 'Bilgisayarın ekranını temizlemek'], answer: 2, explain: 'Hypervisor, sanal makineleri oluşturur ve işlemci, bellek, disk gibi kaynakların kullanımını yönetir.' },
    { question: 'VirtualBox hangi tür hypervisor’dır?', choices: ['Type 1: doğrudan donanım üzerinde', 'Type 2: ana işletim sistemi üzerinde', 'Bir işletim sistemidir', 'Bir fiziksel sunucudur'], answer: 1, explain: 'VirtualBox, ana işletim sistemi üzerinde çalışan Type 2 hypervisor’dır.' },
    { question: 'Bir ISO dosyası neyi temsil eder?', choices: ['Her zaman bir Windows uygulamasını', 'Bilgisayarın RAM kapasitesini', 'Yalnızca sıkıştırılmış fotoğrafları', 'Bir optik diskin içeriğini ve dosya sistemi yapısını taşıyan imajı'], answer: 3, explain: 'ISO bir disk imajıdır. İşletim sistemi kurulumu için uygun, önyüklenebilir bir ISO kullanılır; her ISO önyüklenebilir değildir.' },
    { question: 'Bir VM’ye ayırdığımız RAM miktarı neyi etkiler?', choices: ['Çalışan sistemin ve uygulamaların kullanabileceği belleği', 'Ekranın fiziksel boyutunu', 'İnternet sağlayıcımızı', 'ISO dosyasının adını'], answer: 0, explain: 'RAM, çalışan işletim sistemi ve uygulamalar için bellektir. VM’ye kaynak ayırırken ana bilgisayara da yeterli bellek bırakmalıyız.' },
    { question: 'NAT ile Bridged arasındaki temel fark nedir?', choices: ['NAT yalnızca Linux’ta çalışır', 'Bridged modunda VM internete hiçbir zaman çıkamaz', 'NAT adres çevirisi kullanır; Bridged VM’yi yerel ağın ayrı bir üyesi yapar', 'İki mod tamamen aynı şekilde çalışır'], answer: 2, explain: 'NAT, VM’nin trafiğini sanal NAT yönlendiricisi ve ana bilgisayar üzerinden dışarı taşır. Bridged, VM’yi fiziksel yerel ağa ayrı bir cihaz gibi bağlar.' },
    { question: 'Ana bilgisayarın katılmadığı, yalnızca VM’lerin haberleştiği ağ hangisidir?', choices: ['Bridged Adapter', 'Host-only Adapter', 'NAT', 'Internal Network'], answer: 3, explain: 'Aynı adı kullanan Internal Network’e bağlı VM’ler birbirleriyle haberleşir. Ana bilgisayar bu ağa üye değildir.' },
    { question: 'Guest Additions ne sağlar?', choices: ['Fiziksel bilgisayara daha fazla RAM ekler', 'Ekran uyumu, paylaşılan pano ve paylaşılan klasör gibi bütünleşme özellikleri', 'Bütün işletim sistemlerini otomatik lisanslar', 'ISO indirmeden her sistemi kurar'], answer: 1, explain: 'Guest Additions, konuk sisteme kurulan araçlar ve sürücülerdir. Ekran uyumunu geliştirir; uygun ayarlarla pano ve klasör paylaşımı sunar.' },
  ];
  function lessonEight() {
    return `${heading(8, 'KENDİNİ DENE', 'Sıra sizde.<br><em>Ne kadarını keşfettiniz?</em>', '8 kısa soru, öğrendiklerimizi hatırlamak için güzel bir fırsat. Bir cevap seçin ve nedenini birlikte konuşalım.')}<section class="panel quiz-card" id="quiz-card">${quizVisual()}</section>`;
  }
  function quizVisual() {
    const quiz = state.quiz;
    const correct = quiz.answers.filter((answer, i) => answer === questions[i].answer).length;
    const score = correct * 12.5;
    if (quiz.finished) return `<div class="quiz-result"><span class="detail-icon purple">${icon('trophy', 39)}</span><span class="section-kicker">DERS TAMAMLANDI, KEŞİF DEVAM EDİYOR</span><h2>${correct === 8 ? 'Harika, bütün cevaplar doğru!' : correct >= 5 ? 'Güzel iş! Temeller yerli yerinde.' : 'İyi bir başlangıç, bir tur daha keşfedelim.'}</h2><div class="score-ring" style="--score:${score}%"><span>${score.toLocaleString('tr-TR')}<small>/ 100 PUAN</small></span></div><div class="result-stats"><span><strong>${correct}</strong> doğru</span><span><strong>${8 - correct}</strong> yanlış</span><span><strong>8</strong> soru</span></div><p>${correct === 8 ? 'Artık kendi sanal laboratuvarınızı kurmaya hazırsınız.' : 'Yanlış cevaplar öğrenmenin bir parçası. Konulara dönüp tekrar deneyebilirsiniz.'}</p><div class="actions"><button class="btn btn-primary" data-action="retry-quiz">${icon('reset', 18)}Yeniden dene</button><button class="btn btn-secondary" data-action="back-to-first">Konuları tekrar gez${icon('arrow', 17)}</button></div></div>`;
    const q = questions[quiz.index];
    const answered = quiz.answers[quiz.index] !== undefined;
    const isCorrect = quiz.answers[quiz.index] === q.answer;
    return `<div class="quiz-meta"><span class="tag purple">SORU ${String(quiz.index + 1).padStart(2, '0')} / 08</span><span>${icon('trophy', 18)}${score.toLocaleString('tr-TR')} puan</span></div><div class="quiz-progress"><i style="width:${quiz.index / 8 * 100}%"></i></div><h2 class="quiz-question" tabindex="-1">${q.question}</h2><div class="quiz-options" role="group" aria-label="Cevap seçenekleri">${q.choices.map((choice, i) => `<button class="quiz-option ${answered ? (i === q.answer ? 'correct' : i === quiz.answers[quiz.index] ? 'wrong' : '') : ''}" data-answer="${i}" ${answered ? 'disabled' : ''}><span class="answer-letter">${String.fromCharCode(65 + i)}</span><span>${choice}</span>${answered && i === q.answer ? icon('check', 22) : answered && i === quiz.answers[quiz.index] ? icon('close', 22) : ''}</button>`).join('')}</div><div class="quiz-feedback ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}" role="status">${answered ? `${icon(isCorrect ? 'check' : 'info', 23)}<div><strong>${isCorrect ? 'Doğru cevap! +12,5 puan' : 'Bu kez olmadı. Doğru cevap: ' + String.fromCharCode(65 + q.answer)}</strong><p>${q.explain}</p></div>` : `${icon('bulb', 19)}<p>Acele etmeyin. Birlikte tartışın ve cevabınızı seçin.</p>`}</div><div class="quiz-footer"><span>Her doğru cevap 12,5 puan.</span><button class="btn btn-primary" data-action="next-question" ${answered ? '' : 'disabled'}>${quiz.index === 7 ? 'Sonucumu göster' : 'Sonraki soru'}${icon('arrow', 17)}</button></div>`;
  }

  const renderers = [lessonOne, lessonTwo, lessonThree, lessonFour, lessonFive, lessonSix, lessonSeven, lessonEight];
  function updateLessonControls() {
    const inIntro = current === -1;
    const counter = $('#lesson-counter');
    if (counter) {
      counter.textContent = inIntro ? `${String(state.intro.index + 1).padStart(2, '0')} / 10` : `${String(current + 1).padStart(2, '0')} / 08`;
      counter.setAttribute('aria-label', inIntro ? `Düşünme sorusu ${state.intro.index + 1} / 10` : `Ders ${current + 1} / 8`);
    }
    const previous = $('#prev-lesson');
    if (previous) {
      previous.disabled = inIntro && state.intro.index === 0 && !state.intro.revealed;
      previous.setAttribute('aria-label', inIntro ? (state.intro.revealed ? 'Cevabı gizle, soruya dön' : 'Önceki sorunun cevabına dön') : current === 0 ? 'Düşünme sorularına dön' : 'Önceki ders');
    }
    const following = $('#next-lesson');
    if (following) {
      following.disabled = current === 7;
      const label = $('span', following);
      if (label) label.textContent = inIntro ? (state.intro.index === 9 && state.intro.revealed ? 'Derse başla' : 'İlerle') : current === 6 ? 'Bilgini test et' : current === 7 ? 'Son ders' : 'Sonraki konu';
      following.setAttribute('aria-label', inIntro ? introNextLabel() : current === 7 ? 'Son ders' : 'Sonraki konu');
    }
    const keyboardHint = $('.keyboard-hint > span:last-child');
    if (keyboardHint) keyboardHint.textContent = inIntro ? 'Sağ ok: ilerle · Sol ok: geri dön' : 'Ok tuşlarıyla konular arasında gezin';
  }
  function renderLesson(index, options = {}) {
    const next = Math.max(-1, Math.min(7, Number(index) || 0));
    cancelTimers();
    if (current === 3) { state.pipelineRunning = false; state.pipeline = -1; }
    if (current === 4 && state.sim.boot === 'booting') { state.sim.boot = 'idle'; state.sim.message = ''; }
    current = next;
    if (current >= 0) visited.add(current);
    try { localStorage.setItem('sanallastirma-viewed', JSON.stringify([...visited])); } catch (_) { /* Kayıt zorunlu değildir. */ }
    content.innerHTML = current === -1 ? introduction() : renderers[current]();
    content.classList.remove('lesson-enter');
    void content.offsetWidth;
    content.classList.add('lesson-enter');
    const pageTitle = current === -1 ? 'Önce düşünelim' : titles[current];
    const title = $('#lesson-title'); if (title) title.textContent = pageTitle;
    const progress = $('#progress-bar'); if (progress) { progress.style.width = `${visited.size / 8 * 100}%`; progress.setAttribute('role', 'progressbar'); progress.setAttribute('title', `${visited.size} konu görüntülendi`); progress.setAttribute('aria-label', 'Görüntülenen dersler'); progress.setAttribute('aria-valuemin', '0'); progress.setAttribute('aria-valuemax', '8'); progress.setAttribute('aria-valuenow', visited.size); }
    const progressText = $('#progress-text'); if (progressText) progressText.textContent = `${visited.size} / 8 konu`;
    $$('[data-lesson]').forEach((button) => { const selected = Number(button.dataset.lesson) === current; button.classList.toggle('active', selected); button.classList.toggle('visited', Number(button.dataset.lesson) === -1 ? state.intro.completed : visited.has(Number(button.dataset.lesson))); if (selected) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current'); });
    updateLessonControls();
    const footerTitle = $('#next-lesson-title'); if (footerTitle) footerTitle.textContent = current < 7 ? titles[current + 1] : 'Keşfetmeye devam edin';
    document.body.classList.remove('menu-open');
    $('#toast')?.classList.remove('show', 'visible');
    $('#mobile-menu')?.setAttribute('aria-expanded', 'false');
    document.title = `${pageTitle} · SanalLab`;
    const route = current === -1 ? '#giris' : `#ders-${current + 1}`;
    if (!options.keepHash && location.hash !== route) { try { history.replaceState(null, '', route); } catch (_) { location.hash = route; } }
    if (options.scroll !== false) window.scrollTo({ top: 0, behavior: 'instant' });
    if (options.focus) { content.setAttribute('tabindex', '-1'); content.focus({ preventScroll: true }); }
  }
  function refreshCurrent() {
    const scroll = window.scrollY;
    content.innerHTML = current === -1 ? introduction() : renderers[current]();
    window.scrollTo({ top: scroll, behavior: 'instant' });
  }
  function changeQuiz() { $('#quiz-card').innerHTML = quizVisual(); $('.quiz-question', content)?.focus({ preventScroll: true }); }

  document.addEventListener('click', (event) => {
    const lessonButton = event.target.closest('[data-lesson]');
    if (lessonButton) { renderLesson(lessonButton.dataset.lesson, { focus: true }); return; }
    if (event.target.closest('#prev-lesson')) { if (current === -1) previousIntro(); else renderLesson(current - 1, { focus: true }); return; }
    if (event.target.closest('#next-lesson') && current < 7) { if (current === -1) advanceIntro(); else renderLesson(current + 1, { focus: true }); return; }
    if (event.target.closest('#mobile-menu')) { const open = document.body.classList.toggle('menu-open'); $('#mobile-menu').setAttribute('aria-expanded', open); return; }
    if (event.target.closest('#fullscreen-btn')) { toggleFullscreen(); return; }
    if (event.target.closest('.sidebar-overlay')) { document.body.classList.remove('menu-open'); $('#mobile-menu')?.setAttribute('aria-expanded', 'false'); return; }
    if (!content.contains(event.target)) return;
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.id === 'toggle-vms') { state.vms = !state.vms; $('#virtual-machines').innerHTML = vmVisual(); $('#vm-caption').textContent = state.vms ? 'Üç ayrı sistem, aynı fiziksel kaynakları paylaşıyor.' : 'Tek bir fiziksel bilgisayar. İçindeki olasılıkları keşfedin.'; button.innerHTML = `${icon(state.vms ? 'reset' : 'play', 17)}${state.vms ? 'Başa dön' : 'Sanal makineleri başlat'}`; }
    if (button.dataset.hypervisor) { state.hypervisor = button.dataset.hypervisor; if (state.hypervisor === 'type1' && state.layer === 'host') state.layer = 'hypervisor'; refreshCurrent(); $(`[data-hypervisor="${state.hypervisor}"]`, content)?.focus({ preventScroll: true }); }
    if (button.dataset.layer) { state.layer = button.dataset.layer; refreshCurrent(); $(`[data-layer="${state.layer}"]`, content)?.focus({ preventScroll: true }); }
    if (button.dataset.vm) { state.selectedVM = button.dataset.vm; refreshCurrent(); $(`[data-vm="${state.selectedVM}"]`, content)?.focus({ preventScroll: true }); }
    if (button.id === 'new-vbox-vm') { state.wizard = 0; $('#vbox-wizard').innerHTML = wizardVisual(); }
    if (button.id === 'animate-iso') animateISO();
    if (button.id === 'start-sim') startSim();
    if (button.dataset.network) { state.network = button.dataset.network; refreshCurrent(); $(`[data-network="${state.network}"]`, content)?.focus({ preventScroll: true }); }
    if (button.id === 'install-additions') { state.additions = !state.additions; state.pasted = ''; state.folder = false; refreshCurrent(); $('#install-additions')?.focus({ preventScroll: true }); }
    if (button.dataset.answer !== undefined) { const quiz = state.quiz; if (quiz.finished || quiz.answers[quiz.index] !== undefined) return; quiz.answers[quiz.index] = Number(button.dataset.answer); $('#quiz-card').innerHTML = quizVisual(); $('[data-action="next-question"]', content).focus({ preventScroll: true }); }
    switch (button.dataset.action) {
      case 'intro-next': advanceIntro(); break;
      case 'intro-restart': state.intro = { index: 0, revealed: false, completed: false }; renderLesson(-1, { focus: true }); break;
      case 'close-wizard': state.wizard = -1; $('#vbox-wizard').innerHTML = wizardVisual(); $('#new-vbox-vm').focus({ preventScroll: true }); break;
      case 'wizard-back': state.wizard = Math.max(0, state.wizard - 1); $('#vbox-wizard').innerHTML = wizardVisual(); break;
      case 'wizard-next': if (state.wizard === 3) renderLesson(4, { focus: true }); else { state.wizard++; $('#vbox-wizard').innerHTML = wizardVisual(); $('[data-action="wizard-next"]', content).focus({ preventScroll: true }); } break;
      case 'reset-iso': cancelTimers(); state.pipeline = -1; state.pipelineRunning = false; refreshCurrent(); break;
      case 'new-sim': cancelTimers(); state.sim = { created: true, name: 'Ubuntu Laboratuvarı', os: 'ubuntu', ram: 4, cpu: 2, disk: 40, iso: 'ubuntu', boot: 'idle', bootStep: 0, message: 'Yeni makineniz oluşturuldu. Ayarları değiştirerek kaynakların etkisini keşfedin.' }; refreshCurrent(); $('#vm-name').focus({ preventScroll: true }); break;
      case 'copy-guest': if (state.additions) { state.pasted = state.clipboard.trim(); const result = $('#clipboard-result'); result.textContent = state.pasted ? `Konuk pano: ${state.pasted}` : 'Aktarmak için önce bir metin yazın.'; } break;
      case 'open-folder': if (state.additions) { state.folder = true; $('#folder-result').innerHTML = `${icon('file', 17)} ders-notlari.pdf <span class="tag green">Ana sistemle ortak</span>`; } break;
      case 'next-question': if (state.quiz.answers[state.quiz.index] !== undefined) { if (state.quiz.index === 7) state.quiz.finished = true; else state.quiz.index++; changeQuiz(); } break;
      case 'retry-quiz': state.quiz = { index: 0, answers: [], finished: false }; changeQuiz(); break;
      case 'back-to-first': renderLesson(0, { focus: true }); break;
      default: break;
    }
  });
  content.addEventListener('input', (event) => {
    const { id, value } = event.target;
    if (id === 'clipboard-input') { state.clipboard = value; return; }
    if (!['vm-name', 'vm-ram', 'vm-cpu', 'vm-disk', 'vm-os', 'vm-iso'].includes(id)) return;
    const sim = state.sim;
    if (!sim.created) return;
    cancelTimers(); sim.boot = 'idle'; sim.bootStep = 0; sim.message = '';
    if (id === 'vm-name') sim.name = value;
    if (id === 'vm-ram') sim.ram = Number(value);
    if (id === 'vm-cpu') sim.cpu = Number(value);
    if (id === 'vm-disk') sim.disk = Number(value);
    if (id === 'vm-iso') sim.iso = value;
    if (id === 'vm-os') { const oldName = osNames[sim.os] + ' Laboratuvarı'; sim.os = value; sim.iso = value; $('#vm-iso').value = value; if (sim.name === oldName || sim.name === 'Ubuntu Laboratuvarı') { sim.name = osNames[value] + ' Laboratuvarı'; $('#vm-name').value = sim.name; } if (value === 'windows') { sim.ram = Math.max(4, sim.ram); sim.cpu = Math.max(2, sim.cpu); sim.disk = Math.max(65, sim.disk); $('#vm-ram').value = sim.ram; $('#vm-cpu').value = sim.cpu; $('#vm-disk').value = sim.disk; } }
    if (sim.ram >= 10 || sim.cpu >= 6) sim.message = 'Kaynakların büyük bir bölümünü VM’ye ayırdınız. Ana sistemdeki diğer uygulamalar yavaşlayabilir.';
    $$('.setup-step', content).forEach((el, index) => { el.classList.toggle('done', index === 0); el.classList.toggle('current', index === 6); });
    refreshSimPreview();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { document.body.classList.remove('menu-open'); $('#mobile-menu')?.setAttribute('aria-expanded', 'false'); }
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input, select, textarea, [contenteditable="true"], .quiz-options')) return;
    if (event.repeat && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); return; }
    if (current === -1 && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
      event.preventDefault();
      if (event.key === 'ArrowRight') advanceIntro(); else previousIntro();
      return;
    }
    if (event.key === 'ArrowRight' && current < 7) { event.preventDefault(); renderLesson(current + 1, { focus: true }); }
    if (event.key === 'ArrowLeft' && current > -1) { event.preventDefault(); renderLesson(current - 1, { focus: true }); }
  });
  async function toggleFullscreen() {
    const button = $('#fullscreen-btn');
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else throw new Error('Fullscreen API is unavailable');
    } catch (_) { if (button) { button.setAttribute('title', 'Tam ekran için tarayıcınızda F11 tuşunu kullanın.'); button.setAttribute('aria-label', 'Tam ekran için F11 tuşunu kullanın'); } const notice = $('#toast'); if (notice) { notice.textContent = 'Tam ekran için F11 tuşunu kullanabilirsiniz.'; notice.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => notice.classList.remove('show'), 4200); } }
  }
  document.addEventListener('fullscreenchange', () => { const enabled = Boolean(document.fullscreenElement); document.body.classList.toggle('presentation-mode', enabled); const button = $('#fullscreen-btn'); if (button) { button.setAttribute('aria-pressed', enabled); button.setAttribute('title', enabled ? 'Tam ekrandan çık' : 'Tam ekran · F11'); button.setAttribute('aria-label', enabled ? 'Sunumdan çık' : 'Sunum modunu aç'); const label = $('span', button); if (label) label.textContent = enabled ? 'Sunumdan çık' : 'Sunum modu'; } });
  const hashLesson = () => { const match = location.hash.match(/^#ders-([1-8])$/); return match ? Number(match[1]) - 1 : -1; };
  window.addEventListener('hashchange', () => { if (location.hash !== '#giris' && !/^#ders-[1-8]$/.test(location.hash)) return; const index = hashLesson(); if (index !== current) renderLesson(index, { keepHash: true, focus: true }); });
  renderLesson(hashLesson(), { scroll: false });
})();
