import React from 'react';

const PartnerFloatingImage = () => {
    return (
        <div className="fixed right-4 top-24 z-40 group hidden sm:block">
            <div className="relative p-1.5 rounded-2xl bg-black/10 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-110 hover:bg-black/40 hover:border-white/20">
                <div className="relative w-30 h-30 md:w-36 md:h-36 overflow-hidden rounded-xl">
                    <img
                        src="/partner.webp"
                        alt="Partner"
                        className="w-full h-full object-contain p-2"
                    />
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-secondary rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </div>
        </div>
    );
};

export default PartnerFloatingImage;
