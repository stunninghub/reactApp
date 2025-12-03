import link_arrow from '../assets/link_arrow.svg';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export function HomePage() {

    gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

    useGSAP(() => {
        SplitText.create(".hero_section h1 div, .hero_section h1", {
            type: "lines, words",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
                return gsap.from(self.words, {
                    duration: 1,
                    y: 100,
                    autoAlpha: 0,
                    stagger: 0.05
                });
            }
        });
        gsap.fromTo(".hero_info_box_wrapper", { opacity: 0 }, { opacity: 1, duration: 2 });

        // gsap.fromTo('section.showcase_spacer')
        gsap.fromTo('section.showcase_section .showcase_items',
            {
                x: '-50dvh'
            },
            {
                x: '-100dvh',
                ease: 'sine',
                scrollTrigger: {
                    trigger: 'section.showcase_spacer',            // 🔥 each card triggers itself
                    start: "top 100%",
                    end: "100% top",
                    scrub: true,
                },
            }
        )

        const cards = gsap.utils.toArray(".intro_card");

        cards.forEach((card, indx) => {
            gsap.from(card, {
                opacity: 0,
                scale: 0,
                y: -60,
                duration: 1.5,
                ease: "back.out(1.1)",
                delay: (indx + 1) / 10,

                scrollTrigger: {
                    trigger: '.pin_into_section',            // 🔥 each card triggers itself
                    start: "top 100%",
                    end: "0% top",
                    // scrub: true,
                    once: true,
                    // markers: true
                },
            });
        });


        const scrollingText = gsap.utils.toArray('.tech_logo_slider .logo_itm');

        const tl = horizontalLoop(scrollingText, {
            repeat: -1,
        });

        let speedTween;

        ScrollTrigger.create({
            trigger: ".tech_section",
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                speedTween && speedTween.kill();
                speedTween = gsap.timeline()
                    .to(tl, {
                        timeScale: 3 * self.direction,
                        duration: 0.25
                    })
                    .to(tl, {
                        timeScale: 1 * self.direction,
                        duration: 1.5
                    }, "+=0.5")
            },
            markers: false,
        });

        function horizontalLoop(items, config) {
            items = gsap.utils.toArray(items);
            config = config || {};
            let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
                length = items.length,
                startX = items[0].offsetLeft,
                times = [],
                widths = [],
                xPercents = [],
                curIndex = 0,
                pixelsPerSecond = (config.speed || 1) * 100,
                snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
                totalWidth, curX, distanceToStart, distanceToLoop, item, i;
            gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
                xPercent: (i, el) => {
                    let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                    return xPercents[i];
                }
            });
            gsap.set(items, { x: 0 });
            totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
            for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX;
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                    .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                    .add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index, vars) {
                vars = vars || {};
                (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
                let newIndex = gsap.utils.wrap(0, length, index),
                    time = times[newIndex];
                if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                    vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                curIndex = newIndex;
                vars.overwrite = true;
                return tl.tweenTo(time, vars);
            }
            tl.next = vars => toIndex(curIndex + 1, vars);
            tl.previous = vars => toIndex(curIndex - 1, vars);
            tl.current = () => curIndex;
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.times = times;
            tl.progress(1, true).progress(0, true); // pre-render for performance
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            return tl;
        }
    });

    return (
        <>
            <section className="hero_section">
                <div className="container">
                    <h1>
                        <div className='highlight'>Elegant</div>
                        , powerful, and designed for creators
                    </h1>
                    <div className="hero_info_box_wrapper">
                        <div className="hero_info_box">
                            <img src={link_arrow} className="link_arrow_icon" />
                            <h2>Freelance Website Developer</h2>
                            <span className="live_text_green">Open To Work</span>
                        </div>
                        <div className='hero_keypoints'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quidem labore blanditiis non culpa libero dignissimos.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='tech_section'>
                <div className="tech_logo_slider">
                    <div className='logo_itm'>PHP</div>
                    <div className='logo_itm'>JavaScript</div>
                    <div className='logo_itm'>HTML</div>
                    <div className='logo_itm'>CSS</div>
                    <div className='logo_itm'>React</div>
                    <div className='logo_itm'>Nextjs</div>
                    <div className='logo_itm'>Nodejs</div>
                </div>
            </section>

            <section className='about_section'>
                <div className="container">
                    <div className="about_card_wrap">
                        <div className="abc_left">
                            <h2>Modern, Creative and Intuitive</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis modi nostrum adipisci, maiores, molestias illo unde.</p>
                        </div>
                        <div className="abc_right">
                            <img src="/static/imgs/apps.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className='showcase_section'>
                <div className="showcase_items">
                    <div className="showcase_item">
                        <img src="/static/imgs/shop.jpg" alt="" />
                    </div>
                    <div className="showcase_item">
                        <img src="/static/imgs/apps.jpg" alt="" />
                    </div>
                    <div className="showcase_item">
                        <img src="/static/imgs/vector.jpeg" alt="" />
                    </div>
                </div>
            </section>

            <section className='showcase_spacer'></section>

            <section className='promise_section'>
                <div className="container">
                    <div className="prms_head">
                        <h2>Helping you transform your business</h2>
                        <p>Bold ideas. Smarter strategies. Game-changing results. Let's elevate your brand and unlock its full potential.</p>
                    </div>
                    <div className="promise_cards">
                        <div className="prms_card">
                            <h4>Design</h4>
                            <p>We create exceptional digital experiences that attract audiences, build trust, and inspire action—no matter the industry.</p>
                            <ul>
                                <li>Discovery</li>
                                <li>Web Design</li>
                                <li>UX Design</li>
                                <li>Accessible Design</li>
                            </ul>
                        </div>
                        <div className="prms_card">
                            <h4>Build</h4>
                            <p>Our scalable, future-ready platforms are designed to adapt, integrate and perform, supporting organisations of every size and sector.</p>
                            <ul>
                                <li>Discovery</li>
                                <li>Web Design</li>
                                <li>UX Design</li>
                                <li>Accessible Design</li>
                            </ul>
                        </div>
                        <div className="prms_card">
                            <h4>Grow</h4>
                            <p>With strategy, SEO and data-led marketing, we help organisations in Northern Ireland, the UK and Ireland expand their reach, strengthen loyalty and compete on a global stage.</p>
                            <ul>
                                <li>Discovery</li>
                                <li>Web Design</li>
                                <li>UX Design</li>
                                <li>Accessible Design</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div className="pin_into_section">
                <section className='intro_section'>
                    <div className="container">
                        <div className="intro_cards_wrap">
                            <div className="intro_card">
                                <img src="/static/imgs/apps.jpg" alt="" />
                            </div>
                            <div className="intro_card">
                                <img src="/static/imgs/creative.jpg" alt="" />
                            </div>
                            <div className="intro_card">
                                <img src="/static/imgs/shop.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            </div> */}

            <section>
                <br />
                <br />
                <br />
            </section>
        </>
    )
}