const sponsors = [
  {
    name: 'Global Foundation',
    logo: 'https://via.placeholder.com/180x60/f3f4f6/6b7280?text=Global+Foundation',
  },
  {
    name: 'Care International',
    logo: 'https://via.placeholder.com/180x60/f3f4f6/6b7280?text=Care+International',
  },
  {
    name: 'Hope Alliance',
    logo: 'https://via.placeholder.com/180x60/f3f4f6/6b7280?text=Hope+Alliance',
  },
  {
    name: 'Unity Trust',
    logo: 'https://via.placeholder.com/180x60/f3f4f6/6b7280?text=Unity+Trust',
  },
  {
    name: 'World Aid',
    logo: 'https://via.placeholder.com/180x60/f3f4f6/6b7280?text=World+Aid',
  },
  {
    name: 'Help Network',
    logo: 'https://via.placeholder.com/180x60/f3f4f6/6b7280?text=Help+Network',
  },
];

const Sponsors = () => {
  return (
    <section className="py-16 bg-background border-y">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
            Our Partners & Sponsors
          </h3>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale hover:grayscale-0 
                       opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-h-12 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
