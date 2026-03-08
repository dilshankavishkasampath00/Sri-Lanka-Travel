import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TravelerReviews = () => {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Left (Desktop only) */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-6">
                        <nav className="space-y-1">
                            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" href="/">
                                <span className="material-symbols-outlined">home</span>
                                <span className="font-medium">Home</span>
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl transition-all" href="#">
                                <span className="material-symbols-outlined">reviews</span>
                                <span className="font-medium">Traveler Reviews</span>
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" href="/map">
                                <span className="material-symbols-outlined">map</span>
                                <span className="font-medium">Explore Map</span>
                            </a>
                            <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all" href="/trip-planner">
                                <span className="material-symbols-outlined">bookmark</span>
                                <span className="font-medium">Saved Trips</span>
                            </a>
                        </nav>

                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Top Contributors</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <img alt="User" className="w-10 h-10 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFATSpMiG0HmzY2fNMVfBjzd9HOlshAcSR_3tc8tmbodrFrYCimNOnTVYBbXnPIlRM8-khTFm-XNodxxWDZPr1R_YhKNn-b4OaORQCmjnKCM3-BxJhJRIn0hZOt4ZHyYYaRBFnu5yd7XaXNwK0n-8SrIAwUnsEra9BgkxZeWSEPVYnRavXNP0j9zql40oaeXQXBTEVPFB4qNTAxd6zHe8UL3OsjFrLh5jNtSPjA3hn33INxUKpXgwDIFum1RFyLd1yA6SCOCTm1QU" />
                                    <div>
                                        <p className="text-sm font-bold">Amara Perera</p>
                                        <p className="text-xs text-slate-500">124 Reviews • Elite</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img alt="User" className="w-10 h-10 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDZM3QvsbfqP8Ur3affCfMLVh_MsqoLgqnyIgibHQ9q2deaF8NvfuVWmFv7xpCTz8Z9PaD0ZXoSc3HH9jZTtSXkpfVbh6g5Et9nzILBGiNMa8YxiZH_p3S_lfDzZGEjjf40LxP1rPzHoYwrQd9YV3eWg6U_aKALawtzRl4C5UVy1rMs4bGyzkA8OdFIihJ7H8YVzAZI5BrQkz7IXMNV6VjwBcaUAl1KTJpTiursGpJ1bLo5Me83jH_n3dzkPO9QzPLcRBzSLJ0WAw" />
                                    <div>
                                        <p className="text-sm font-bold">Kasun Jay</p>
                                        <p className="text-xs text-slate-500">89 Reviews • Pro</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <img alt="User" className="w-10 h-10 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJwtX1Prry_apZUrefF6ohSrdefMNtHQDgtXNu3SBDM0rUJ_vufeV3GZJe_Owqzw5yWppmjt1qXLJCS6qVjTGfjjoewGnIGx9wVw-cNcaE2UMoJ7e1bN8uINJAfmfJr8SWP9zCRzmoDocSG0ujWHNsxZXo5JB9q2AJ-AchxZHYN6CWhSfdfudRwgzX7Vuh-Jfhx8egibqTKD9jSJ_ez6OXUxrikbnC0c27u_2K_g3LF9g0_zR0kYvQOjFRP2AMu6McltLfXk-EeTo" />
                                    <div>
                                        <p className="text-sm font-bold">Sarah Miller</p>
                                        <p className="text-xs text-slate-500">56 Reviews • Voyager</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        {/* Hero Share Section */}
                        <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-8">
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-40 bg-gradient-to-l from-primary/40 to-transparent"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-2">Share Your Story</h2>
                                <p className="text-slate-300 mb-6 max-w-md">Help fellow travelers by sharing your unique adventures in the Pearl of the Indian Ocean.</p>
                                <button className="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
                                    <span className="material-symbols-outlined">edit_square</span>
                                    Write a Review
                                </button>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 text-primary opacity-20 rotate-12">
                                <span className="material-symbols-outlined text-[120px]">local_activity</span>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                Destination
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium">
                                <span className="material-symbols-outlined text-sm">star</span>
                                Rating
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium">
                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                                Most Recent
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            <div className="flex-1"></div>
                            <span className="text-sm text-slate-500">Showing 1,240 reviews</span>
                        </div>

                        {/* Review Feed */}
                        <div className="space-y-6">
                            {/* Review Card 1 */}
                            <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <img alt="User" className="w-12 h-12 rounded-full border-2 border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpdDq1w5btLeL5FimDfPgVHn9sPdbvJ_ZsMmBgfFJo7ee1Kv5oWOeBtr14PtBZYaRj_2XfYK4IVezK2OCtvwhTk8AeaT77SJcko4HHn5-6194ehnWo0Q5oeJfsg9kieVcWP5eMka6L1uYgE4BCIvIQBYmxuMZzkxTr5sL5dOY_0PBXHaC3FPEBVps0VSjPtQuLANkoG2ZufqdGcH6273xTa_Cv4uQ0Q3KqdzjKvp1QACj4KPCIlppN2IA-NFJIVwnsfEqH4DaV4q8" />
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white">Isuru Bandara</h4>
                                                <p className="text-xs text-slate-500">Visited Sigiriya • 2 days ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span>4.9</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                        Climbing Sigiriya Rock at sunrise was an otherworldly experience. The views of the surrounding jungle are breathtaking. Make sure to arrive early (around 6:30 AM) to avoid the heat and the crowds!
                                    </p>
                                    <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-4">
                                        <img alt="Sigiriya" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqWBIBTkXJhFBT7Y8NVn79DvRLpWH2b7i2qOAP6sFOrHsf7P1k-1Hg6aePTx7gY6VkA2ytR7v37oJ0TLDTAv4pouL_JMgnjuBMmccm4CtFc9WsYigMPjObVjUJ700hbX_eX6z5CNOUV8B04gXipJmn_kho9OeMQOfR-GWxFWw8Kp_OMsKPL0EH2EBdCuweHzV09iTyQYTW6xaVP0HoSIQYVrfXXJIm5WKpQvu-ZVPDzrq0S1kFA0FpHazdw53e6hp8UjkcX23U7ug" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">location_on</span>
                                                Sigiriya, Central Province
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                                            <span className="material-symbols-outlined text-lg">thumb_up</span>
                                            Helpful (42)
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                                            <span className="material-symbols-outlined text-lg">chat_bubble</span>
                                            Comment
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                                            <span className="material-symbols-outlined text-lg">share</span>
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Review Card 2 */}
                            <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <img alt="User" className="w-12 h-12 rounded-full border-2 border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqiN3HV_R7YPnt2UxQ5KtgcBzLSxNkULA1h5RMsOrk7_N7sRNq87HYrClyobBumRpJGi9Dyd0ZHIXB3bzd4yrFa_kXeauT7XQyCk3P5AeiTsIHnd5w_yMnS0BLqfnfydzFtmB8UnQJRiEXTlWD78I4QP0gof5qZBZZQOCPMyTmeFK-NTrU7gzkEBi-wU9-Ocu4oG7iyUxfURDarZb0Vin0bFlb8XyeNms-DM5pfm5T3KOrrCZJ9d9taQooTS-OQkpS3wH81BHH4eU" />
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white">Elena Rossi</h4>
                                                <p className="text-xs text-slate-500">Visited Mirissa • 1 week ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span>5.0</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                        Mirissa is a paradise for ocean lovers. I went whale watching and saw three Blue Whales! The Coconut Tree Hill is also a must-visit for sunset photography. Best beach vibes in Sri Lanka.
                                    </p>
                                    <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-4">
                                        <img alt="Mirissa" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAirnJFhVMyhUN7f8a3eOaJS-4JKxxRWzvWr-BzwIDbwNvDQd3SgJ467i0qaGjoLsWRUrVzvWnRop3jFNkbxmVFsbOQ-7M8oiQF_1uscP3gwXIwWYGmCEq9KzQm-R02kKJllGv7hxW4nQzvOTI1ay1AgqL3u2qsipo2o-b68-9lbSGm0dPOSZPQ6jdeLPEzm6b9oa9a2mqobz60dUNyVCCklLIW95SXte7xx5lkELcivheImux0RH-qPc1LvDRoHwc-K_vtSbt60IU" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">location_on</span>
                                                Mirissa Beach, South
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                                            <span className="material-symbols-outlined text-lg">thumb_up</span>
                                            Helpful (128)
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                                            <span className="material-symbols-outlined text-lg">chat_bubble</span>
                                            Comment
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                                            <span className="material-symbols-outlined text-lg">share</span>
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                    {/* Sidebar Right (Trending/Maps) */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg">Trending Now</h3>
                                <span className="material-symbols-outlined text-primary">trending_up</span>
                            </div>
                            <div className="space-y-4">
                                <div className="group cursor-pointer">
                                    <div className="relative h-32 w-full rounded-xl overflow-hidden mb-2">
                                        <img alt="Ella" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfB6Lb8UNaHLzfOGWVeLfvI7kCd1w090NKNZuWwuZAz9iqvRlc6Yizric3Lu2y9Z1I3eAlmnIE_sdysHsUEA77msE5M3lCP1qOIgp5Y6mk_JHPiPEtRFij7clfHZXHGYt4ZiST8sKEeXRNQrVYV4n0Qc__l3MkUtu0gTnKlUPy6ryVbJplz6iEh3XNo00Ji-ARTJycSAdXCmdtqFkocfLMFmHlIWmuC5cbqPaqnbEIq1xiOUqddsYCcNa0cvLnq_mMUo0FdUiXmRc" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                                            <p className="text-white font-bold">Ella Train Journey</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>3.2k searches this week</span>
                                        <span className="text-primary font-bold">+12%</span>
                                    </div>
                                </div>
                                <div className="group cursor-pointer">
                                    <div className="relative h-32 w-full rounded-xl overflow-hidden mb-2">
                                        <img alt="Galle" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWVyxO91pdFWqpsl99jaiSa-qWu22uSN5uo8nkMx5B1YfoBXAwqvc0sMG-QpiCTyMbJuYs4jqeCaEeFJ5DjfpJR0vLXvI-UtzjDZ7kU0O8CYcf3mXTruPqiEql_1vphM-5sNJE6aujZTz1d0-ot8_bpvtlETEEOdY5zfimCZjyqq_DJOLt-bwdqZlXavLyyge_GqKHeJCO0RxMpMxJGDhYynrnI6W1y2T9ob9_hiGQutRlHRZISGvUpZvkhkXcmgDoDhhwNNd5HZE" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                                            <p className="text-white font-bold">Galle Fort</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>1.8k searches this week</span>
                                        <span className="text-primary font-bold">+5%</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 text-sm font-bold border border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                                View All Destinations
                            </button>
                        </div>

                        <div className="bg-primary p-6 rounded-2xl text-slate-900">
                            <h4 className="font-bold mb-2">Join the Club</h4>
                            <p className="text-sm opacity-90 mb-4 font-medium">Get exclusive travel tips and meet other adventurers in Sri Lanka.</p>
                            <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-bold">
                                Join Community
                            </button>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-sm">Nearby Reviewers</h3>
                            </div>
                            <div className="h-48 bg-slate-200 dark:bg-slate-800 relative">
                                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span className="material-symbols-outlined text-primary text-4xl animate-pulse">location_on</span>
                                </div>
                                <img alt="Map" className="w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzUMhWrNTY9DkVUxCiEGPYKU5Ych90nuGUnU8CANrkxyZb12sNKKsSO1-JnuQOaEE7hZciqgxLMtfQ3Sfn1GrOYvfmzkHMBZ2FNvyKbQypGKGpiAmMIhPjXFMdtkefLZTO0h8CoUJG-5stm5gcsH5ir3sgGWqezs_eVYuG7Awxko3RZ1_FF0mWek8E-B8lRXkyQ4LDpHFbnhVAMb6Ef0uqYn17Qr9KArw4QslWYU7pwbvrk6v5DHXjBI_bzvExQZXVi7QTpTzGQIQ" />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default TravelerReviews;
