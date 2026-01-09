import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart, Users, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';

const Services = () => {
    return (
        <Layout>
            <PageHero
                title="Support the Well-Being of"
                accentText="Gaumatas Today!"
                subtitle="Our Services"
                description="At GauChara, we offer a range of services dedicated to the health and well-being of Bos Indicus cows. Our focus is on providing high-quality nutrition and sustainable cattle care practices that align with Indian traditions."
            />

            {/* Process Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Initiate',
                                desc: 'Establishing a strong foundation for cattle care',
                                detail: 'In this initial step, we assess the needs of our cattle and set up a tailored nutrition plan that aligns with their health requirements.'
                            },
                            {
                                step: '02',
                                title: 'Review',
                                desc: 'Effective feeding and monitoring of cattle health',
                                detail: 'During this phase, we implement the nutrition plan, providing high-quality silage and closely monitoring the cattle’s health to ensure they are thriving.'
                            },
                            {
                                step: '03',
                                title: 'Process',
                                desc: 'Healthy cattle and sustainability',
                                detail: 'This step focuses on ensuring that the cattle receive the best possible nutrition.'
                            },
                            {
                                step: '04',
                                title: 'Completion',
                                desc: 'Commitment to quality and care',
                                detail: 'The final step guarantees that our cattle thrive, reflecting our commitment to quality and care.'
                            }
                        ].map((item, index) => (
                            <div key={index} className="relative p-8 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 transition-all duration-300 group">
                                <span className="text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors absolute top-4 right-4">
                                    {item.step}
                                </span>
                                <h3 className="text-2xl font-bold mb-2 font-serif">{item.title}</h3>
                                <p className="font-semibold text-primary mb-4">{item.desc}</p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {item.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Services Section */}
            <section className="section-padding bg-muted/20">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="section-title">Our Services</h2>
                        <p className="section-subtitle">
                            At GauChara, we offer a range of services dedicated to the health and well-being of Bos Indicus cows. Our focus is on providing high-quality nutrition and sustainable cattle care practices that align with Indian traditions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'High-Quality Silage',
                                desc: 'Our silage is made from premium corn crops, ensuring optimal energy and nutrition for our cows, promoting their overall health and happiness.'
                            },
                            {
                                title: 'Sustainable Practices',
                                desc: 'We implement eco-friendly farming techniques that not only benefit our cattle but also contribute to the preservation of the environment and local ecosystems.'
                            },
                            {
                                title: 'Cultural Significance',
                                desc: 'Our initiative honors the spiritual and cultural importance of Gaumatas in Indian society, fostering a deeper connection between people and these sacred animals.'
                            }
                        ].map((service, index) => (
                            <div key={index} className="bg-card p-10 rounded-3xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 font-serif">{service.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Commitment to Welfare Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Veterinary care for cows"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/10" />
                        </div>

                        <div>
                            <h2 className="section-title mb-6">Commitment to Welfare</h2>
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Heart className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 font-serif">Animal Health Monitoring</h3>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        We regularly monitor the health of our cows, ensuring they receive the best care possible, which includes veterinary check-ups and nutritional assessments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="section-padding bg-primary/5">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="section-title">Why Choose Us?</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            GauChara is committed to excellence in cattle care, providing high-quality feed and sustainable practices that ensure the well-being of our Gaumatas. Join us in our mission to promote animal welfare and cultural heritage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Join Our Community Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center bg-card border border-border p-12 rounded-[40px] shadow-sm">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 font-serif">Support Our Mission</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                By supporting GauChara, you contribute to the welfare of Bos Indicus cows and the promotion of sustainable agriculture practices in India.
                            </p>
                        </div>
                        <div className="md:text-right">
                            <h2 className="text-3xl font-bold mb-4 font-serif">Get Involved</h2>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                We welcome volunteers and supporters who share our passion for animal welfare and sustainable practices. Together, we can make a difference.
                            </p>
                            <Button asChild className="btn-primary px-10 py-6 rounded-full text-lg">
                                <Link to="/contact">
                                    Join as Volunteer
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="section-padding bg-muted/10">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="section-title mb-6">Contact Us</h2>
                            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                                For more information about our services and how you can help, please reach out to us through our website or social media channels.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email Us</p>
                                        <p className="font-bold">info@gauchara.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Call Us</p>
                                        <p className="font-bold">+91 9052590515</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Visit Us</p>
                                        <p className="font-bold">4-1-2/2 Ramkoti Hyderabad- 500001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card p-10 rounded-3xl shadow-xl border border-border">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Your Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Your Email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                                </div>
                                <Button className="w-full btn-primary py-6 rounded-xl text-lg">
                                    Submit Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stay Connected Section */}
            <section className="py-20 bg-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-4 font-serif">Stay Connected</h2>
                    <p className="text-xl mb-10 opacity-90">Follow Us on Social Media</p>

                    <div className="flex justify-center gap-6">
                        <a href="#" className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="#" className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="#" className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a href="#" className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                            <Youtube className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Services;
