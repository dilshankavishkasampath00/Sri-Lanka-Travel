import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Destinations = () => {
    return (
        <>
            <Navbar />
            <main className="mx-auto w-full max-w-7xl flex-1 px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
                {/* Hero Section Header */}
                <div className="mb-8 sm:mb-12 flex flex-col items-start gap-2 sm:gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                        <span className="material-symbols-outlined text-sm">explore</span>
                        Paradise Awaits
                    </div>
                    <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-900 dark:text-slate-100">
                        Explore Our <span className="text-primary">Destinations</span>
                    </h1>
                    <p className="max-w-xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
                        Discover the magic of Sri Lanka's most iconic locations, from ancient rock fortresses to misty tea plantations and pristine beaches.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 sm:mb-10 flex flex-wrap items-center gap-2 sm:gap-3 border-b border-primary/5 pb-6 sm:pb-8">
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow">
                        <span className="material-symbols-outlined text-base sm:text-lg">grid_view</span>
                        <span className="hidden sm:inline">All Destinations</span>
                        <span className="sm:hidden">All</span>
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-white px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-600 hover:bg-primary/5 dark:bg-white/5 dark:text-slate-300 transition-colors">
                        <span className="material-symbols-outlined text-base sm:text-lg">landscape</span>
                        <span className="hidden sm:inline">Nature</span>
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-white px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-600 hover:bg-primary/5 dark:bg-white/5 dark:text-slate-300 transition-colors">
                        <span className="material-symbols-outlined text-base sm:text-lg">surfing</span>
                        <span className="hidden sm:inline">Coastal</span>
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-white px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-600 hover:bg-primary/5 dark:bg-white/5 dark:text-slate-300 transition-colors">
                        <span className="material-symbols-outlined text-base sm:text-lg">history_edu</span>
                        <span className="hidden sm:inline">Heritage</span>
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-white px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-600 hover:bg-primary/5 dark:bg-white/5 dark:text-slate-300 transition-colors">
                        <span className="material-symbols-outlined text-base sm:text-lg">pets</span>
                        <span className="hidden sm:inline">Wildlife</span>
                    </button>
                </div>

                {/* Destination Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {/* Card 1: Sigiriya */}
                    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-white/5 border border-primary/5">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm text-yellow-500">wb_sunny</span> 28°C
                            </div>
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Sigiriya" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO4j8nDoLQ96BCgOMw_oFqgmkmQDvoVkGnkWq5KlWMtuPOY5a0uZm3KyHMeESUsJwCTQ_opin7RnSofeKNK8rTcfkALvpgdc89pQs3o5SfszMC1CIBtMlHCE4K-uz0pHOuvONkWGarwTLFvtMrKoNav_Bw-EOay4eoWhTaF2LxTtTS7Gsj52UcaShhmcpjcXyeKO25kVfTR6hccmBaRl9j8T8sqsWwLqyW1rcV-v1NKd89gBWfnDQXE4yqCTRG3hqmwGV_FfgPiNI" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div className="flex flex-1 flex-col p-4 sm:p-6">
                            <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                                <h3 className="text-lg sm:text-xl font-bold">Sigiriya</h3>
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-primary w-fit">UNESCO Heritage</span>
                            </div>
                            <p className="mb-4 sm:mb-6 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                Climb the ancient 'Lion Rock' fortress, a marvel of 5th-century urban planning and home to the world-famous frescos.
                            </p>
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <Link to="/map" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-base sm:text-lg">map</span>
                                    <span className="hidden sm:inline">View on Map</span>
                                    <span className="sm:hidden">Map</span>
                                </Link>
                                <Link to="/hotels" className="flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline">
                                    <span className="material-symbols-outlined text-base sm:text-lg">hotel</span>
                                    <span className="hidden sm:inline">Nearby Hotels</span>
                                    <span className="sm:hidden">Hotels</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Ella */}
                    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-white/5 border border-primary/5">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm text-blue-400">cloud</span> 22°C
                            </div>
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Ella" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDivt0lQshFZBvJ04oU7-E-z22SWTxZin1fp1IsisHyX0HOUjRhRKzwn_OH8AIhv5HqlKfOWSdAVzMjY9f9y91O4Veu8aaLBxzyn98tnKKYbOFD4i7DWI33uWcIHSxkFfzjIGrOWUA1QjvK9dgrLS9YSebImhSeHN3Iobn4M5wSsDzOqooIXOI_pjDhh1KDbQokWyDTTqgebMoKxbNVuxQOBLrEhnPU5HLccUPYcYEILh3Vr1ioUo3XQ81JiVbgFAaIp3mSwBodBo4" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-xl font-bold">Ella</h3>
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Hill Country</span>
                            </div>
                            <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                A mountain village known for its emerald tea plantations, the iconic Nine Arch Bridge, and breathtaking trekking trails.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Link to="/destination/ella" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-lg">explore</span> View Details
                                </Link>
                                <Link to="/hotels" className="flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline">
                                    <span className="material-symbols-outlined text-lg">hotel</span> Nearby Hotels
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Galle */}
                    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-white/5 border border-primary/5">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur-md">
                                <span className="material-symbols-outlined text-sm text-yellow-500">wb_sunny</span> 29°C
                            </div>
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Galle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjcfQu9XVUidXx2ID9Q_vy6oNu_CR-_J6rKt3PeSH-uENe8j_mOYKbLn769uTZ8TQExtfPRBMkTpgNdLgUOnvprxOW4pOJDNYSxm7yDhSbyVHxf4dOqdvWpI5DGZwotefOaPGMOkL_lRhmn0mxRVQrICOuBep_F98NeDZ4vt1zQ5XDGVYYCPDc1GAKysHsN2AvDmGkba6E295toSAGCX0rkHVSuMynAOebt44wMYaNcZEj1h7qLnbTHUevZBAB8cVx8eqjKz-fvyE" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div class="flex flex-1 flex-col p-6">
                            <div class="mb-2 flex items-center justify-between">
                                <h3 class="text-xl font-bold">Galle</h3>
                                <span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Coastal Fort</span>
                            </div>
                            <p class="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                Wander through Dutch-colonial streets within the Galle Fort, enjoying boutiques, cafes, and stunning ocean sunsets.
                            </p>
                            <div class="flex flex-col gap-3">
                                <Link to="/map" class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                                    <span class="material-symbols-outlined text-lg">map</span> View on Map
                                </Link>
                                <Link to="/hotels" class="flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline">
                                    <span class="material-symbols-outlined text-lg">hotel</span> Nearby Hotels
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Yala */}
                    <div class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-white/5 border border-primary/5">
                        <div class="relative aspect-[4/3] overflow-hidden">
                            <div class="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur-md">
                                <span class="material-symbols-outlined text-sm text-orange-400">thermostat</span> 31°C
                            </div>
                            <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Yala" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFMVddyZ4nnqx88pijFeMc0wegT57GlT4US616Z-GvOqmbbGk2u4geTqBqMa_JdSNLxIIf_q1WBI6Sz5_Wp3VCw17J-SB4aatl3gRpSJXrsG91C7cgSfqJkW5tKAIg4lOZ9asQhpRFiipXjSOaJyOqSdXv29Ff95a63xA_eo0QD4qXubXo_70G-Exh5fVL14Zflcuh31UGzMR6_ZF60Y-Sz1JIBWzPbYuH3RSQ2X91ldH0w3csCp6MyHG-f84G8DWHkqM3RaQIx88" />
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div class="flex flex-1 flex-col p-6">
                            <div class="mb-2 flex items-center justify-between">
                                <h3 class="text-xl font-bold">Yala</h3>
                                <span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Wildlife Safari</span>
                            </div>
                            <p class="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                Home to the highest density of leopards in the world, elephants, and crocodiles. A must-visit for wildlife enthusiasts.
                            </p>
                            <div class="flex flex-col gap-3">
                                <Link to="/map" class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                                    <span class="material-symbols-outlined text-lg">map</span> View on Map
                                </Link>
                                <Link to="/hotels" class="flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline">
                                    <span class="material-symbols-outlined text-lg">hotel</span> Nearby Hotels
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Arugam Bay */}
                    <div class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-white/5 border border-primary/5">
                        <div class="relative aspect-[4/3] overflow-hidden">
                            <div class="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur-md">
                                <span class="material-symbols-outlined text-sm text-yellow-500">wb_sunny</span> 30°C
                            </div>
                            <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Arugam Bay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnI_Hqa7suLuO-3idboPivnbEYxpujDQlaF4_zoerT-y_TOy1OCJ6YPzjHlSPbMJRmjzqUPtrYfnVlyd3jgdc7LCc1KlaJQ1pOtUV9cc94IPpNICarV-LZjo5-olucePUzrDYnz--zD2-lf86mgj9ZoIYAIUzUpwDHqjoL9VXFiJsLm55rUlQmPdc8NKSx0IJtHkILcNKJ-za_LilRWbAhCNY116BRpLwpd_azDymP1LsjhMwW9scPYj3zaP0BdeC9DltFwDSbqzY" />
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div class="flex flex-1 flex-col p-6">
                            <div class="mb-2 flex items-center justify-between">
                                <h3 class="text-xl font-bold">Arugam Bay</h3>
                                <span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Surfers Paradise</span>
                            </div>
                            <p class="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                A laid-back surf town on the east coast, world-renowned for its long right-hand point breaks and chill vibes.
                            </p>
                            <div class="flex flex-col gap-3">
                                <Link to="/map" class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                                    <span class="material-symbols-outlined text-lg">map</span> View on Map
                                </Link>
                                <Link to="/hotels" class="flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline">
                                    <span class="material-symbols-outlined text-lg">hotel</span> Nearby Hotels
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 6: Kandy */}
                    <div class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-white/5 border border-primary/5">
                        <div class="relative aspect-[4/3] overflow-hidden">
                            <div class="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900 backdrop-blur-md">
                                <span class="material-symbols-outlined text-sm text-blue-400">cloud_queue</span> 24°C
                            </div>
                            <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Kandy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwxdr_rpFxKjXMbLh5qGaAuP1IA3jzoTpDdk8_kp0G2z_9tFkCIcmvE1P2i04v2JOTUSqnURZ3PWTC0OUKtVp0ZCxZhkWTvy_wd7Wal14AtC2HvtkDQ7gSUvNjy4cf1sBibfhMiXNDKr3zGnk0i4D5h2lwX3IJjzhiJO41Fmvu9MycxjOV0bErpytcR0LCkzyqpn8yCNSQbKcSsgzyYcnbQgFQ0QP-fT4Vs-ZlujfDCZ8rjlR4ftOEYEPc79uCShEIOvqNTsKfGOY" />
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                        </div>
                        <div class="flex flex-1 flex-col p-6">
                            <div class="mb-2 flex items-center justify-between">
                                <h3 class="text-xl font-bold">Kandy</h3>
                                <span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Cultural Capital</span>
                            </div>
                            <p class="mb-6 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                The heart of Buddhism in Sri Lanka, home to the sacred Temple of the Tooth and beautiful lake-side walks.
                            </p>
                            <div class="flex flex-col gap-3">
                                <Link to="/map" class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                                    <span class="material-symbols-outlined text-lg">map</span> View on Map
                                </Link>
                                <Link to="/hotels" class="flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline">
                                    <span class="material-symbols-outlined text-lg">hotel</span> Nearby Hotels
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Destinations;
