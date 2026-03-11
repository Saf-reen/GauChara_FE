import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Heart, Users, Calendar, MapPin, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/layout/PageHero";
import { volunteerApi } from "@/lib/api";

const Volunteer = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    occupation: "",
    availability: "",
    skills: "",
    reason: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await volunteerApi.create(formData);
      console.log('Volunteer application submitted:', response);

      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "Thank you for your interest in volunteering with us. We'll contact you soon!",
      });

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        age: "",
        address: "",
        occupation: "",
        availability: "",
        skills: "",
        reason: "",
      });
    } catch (error: any) {
      console.error("Submission error:", error);

      // Attempt to map backend validation errors to form fields
      if (error.response?.data) {
        const apiErrors = error.response.data;
        const newErrors: Record<string, string> = {};

        Object.keys(apiErrors).forEach((key) => {
          // Check if the key exists in our form data or if it's a known field
          // Some backends might return non_field_errors or other keys
          if (Object.keys(formData).includes(key) || key === 'non_field_errors') {
            // Handle array of errors or single string
            newErrors[key] = Array.isArray(apiErrors[key])
              ? apiErrors[key][0]
              : apiErrors[key];
          }
        });

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        }
      }

      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit application. Please check the form and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Directly contribute to the welfare of Gaumata and experience the joy of service",
    },
    {
      icon: Users,
      title: "Join Our Community",
      description: "Connect with like-minded individuals who share your passion for cow protection",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Choose volunteering hours that fit your schedule and commitments",
    },
  ];

  return (
    <Layout>
      <PageHero
        title="Become a"
        accentText="Volunteer"
        subtitle="Join Our Mission"
        description="Your time and dedication can make a real difference in the lives of Gaumata. Join our community of compassionate volunteers and be part of something meaningful."
      />

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Why Volunteer With Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Volunteering at GauChara is more than just giving your time—it's about being part of a sacred mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-6 rounded-2xl border shadow-sm text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Registration Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Volunteer Registration Form
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below to join our volunteer program. We'll review your application and get back to you soon.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-muted/30 p-8 rounded-2xl border shadow-lg"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={errors.full_name ? "border-destructive" : ""}
                      />
                      {errors.full_name && <p className="text-destructive text-sm mt-1">{errors.full_name}</p>}
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2">
                        Age *
                      </label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="25"
                        className={errors.age ? "border-destructive" : ""}
                      />
                      {errors.age && <p className="text-destructive text-sm mt-1">{errors.age}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                      Address *
                    </label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your complete address..."
                      rows={3}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-foreground mb-2">
                      Occupation *
                    </label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="e.g., Student, Professional, Retired"
                      className={errors.occupation ? "border-destructive" : ""}
                    />
                    {errors.occupation && <p className="text-destructive text-sm mt-1">{errors.occupation}</p>}
                  </div>
                </div>

                {/* Volunteer Details */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Volunteer Details
                  </h3>

                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-foreground mb-2">
                      Availability *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md bg-background ${errors.availability ? "border-destructive" : "border-input"}`}
                    >
                      <option value="">Select your availability</option>
                      <option value="WEEKDAYS">Weekdays</option>
                      <option value="WEEKENDS">Weekends</option>
                      <option value="BOTH">Both Weekdays & Weekends</option>
                      <option value="FLEXIBLE">Flexible</option>
                    </select>
                    {errors.availability && <p className="text-destructive text-sm mt-1">{errors.availability}</p>}
                  </div>

                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-foreground mb-2">
                      Skills & Interests *
                    </label>
                    <Textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="Tell us about your skills, interests, or how you'd like to help (e.g., animal care, teaching, fundraising, social media, etc.)"
                      rows={4}
                      className={errors.skills ? "border-destructive" : ""}
                    />
                    {errors.skills && <p className="text-destructive text-sm mt-1">{errors.skills}</p>}
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-foreground mb-2">
                      Why do you want to volunteer with us? *
                    </label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Share your reason for volunteering and what you hope to contribute..."
                      rows={5}
                      className={errors.reason ? "border-destructive" : ""}
                    />
                    {errors.reason && <p className="text-destructive text-sm mt-1">{errors.reason}</p>}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="sacred"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    "Submitting Application..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              If you have any questions about volunteering, feel free to reach out to us.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 9052590515</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>savadiafoundation@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Hyderabad, Telangana</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Volunteer;
