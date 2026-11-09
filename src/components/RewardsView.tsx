import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Voucher, ClaimedVoucher, ThemeConfig, UserProfile } from '../types/index.ts';
import { REAL_LIFE_VOUCHERS } from '../data/vouchers.ts';
import { soundEngine } from '../services/soundEngine.ts';
import { canRedeemVoucher } from '../utils/rewards.ts';
import { BrandLogo } from './BrandLogo.tsx';

interface RewardsViewProps {
  theme: ThemeConfig;
  user: UserProfile;
  claimedVouchers: ClaimedVoucher[];
  onRedeem: (voucher: Voucher) => void;
  onNavigateHome: () => void;
  onSelectTargetReward?: (voucherId: string) => void;
}

export const RewardsView: React.FC<RewardsViewProps> = ({
  theme,
  user,
  claimedVouchers,
  onRedeem,
  onNavigateHome,
  onSelectTargetReward,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVoucherForClaim, setSelectedVoucherForClaim] = useState<Voucher | null>(null);
  const [activeWalletVoucher, setActiveWalletVoucher] = useState<ClaimedVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = [
    { id: 'all', label: 'All Coupons (₹)' },
    { id: 'Food & Drinks', label: 'Coffee & Food' },
    { id: 'Gift Card', label: 'Gift Cards' },
    { id: 'Fitness & Health', label: 'Fitness & Ergonomics' },
    { id: 'Work & Tech', label: 'Workstation Tech' },
    { id: 'wallet', label: `My Wallet (${claimedVouchers.length})` },
  ];

  const filteredVouchers =
    activeCategory === 'all'
      ? REAL_LIFE_VOUCHERS
      : activeCategory === 'wallet'
      ? []
      : REAL_LIFE_VOUCHERS.filter((v) => v.category === activeCategory);

  const handleClaimConfirm = () => {
    if (!selectedVoucherForClaim) return;
    if (!canRedeemVoucher(user.points, selectedVoucherForClaim.pointsRequired)) return;

    soundEngine.playCelebration();
    confetti({
      particleCount: 70,
      spread: 60,
      colors: [theme.primaryColor, '#ffd700', '#ffffff'],
    });

    onRedeem(selectedVoucherForClaim);
    const newClaimed: ClaimedVoucher = {
      ...selectedVoucherForClaim,
      claimedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + selectedVoucherForClaim.expiryDays * 86400000).toISOString(),
      isUsed: false,
    };
    setSelectedVoucherForClaim(null);
    setActiveWalletVoucher(newClaimed);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    soundEngine.playClick();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Balance Hero Card */}
      <div
        className={`p-5 rounded-3xl border ${theme.cardBgClass} ${theme.borderClass} relative overflow-hidden`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/70 font-bold">
              AVAILABLE POSTURE BALANCE
            </div>
            <div
              className="text-4xl font-black tracking-tight mt-1 flex items-center gap-2.5"
              style={{ color: theme.primaryColor }}
            >
              <span>{user.points}</span>
              <span className="text-xs uppercase px-2.5 py-1 rounded-full bg-white/10 text-white font-black">
                Points
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/70 font-medium">Vouchers Claimed:</span>
            <div className="text-2xl font-black text-white mt-0.5">{claimedVouchers.length}</div>
          </div>
        </div>

        {/* Real Brand Logos Preview Strip */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-white/60 uppercase font-bold tracking-wider">
            Official Brand Partners:
          </span>
          <div className="flex items-center gap-2 text-white/90">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center p-1" title="Nike">
              <BrandLogo brand="Nike" size={18} />
            </div>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center p-1" title="Starbucks">
              <BrandLogo brand="Starbucks" size={18} />
            </div>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center p-1" title="Amazon">
              <BrandLogo brand="Amazon" size={18} />
            </div>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center p-1" title="Spotify">
              <BrandLogo brand="Spotify" size={18} />
            </div>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center p-1" title="Swiggy">
              <BrandLogo brand="Swiggy" size={18} />
            </div>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center p-1" title="Cult.fit">
              <BrandLogo brand="Cult.fit" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              soundEngine.playClick();
            }}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? `${theme.buttonClass} scale-105 shadow-md`
                : 'bg-white/10 hover:bg-white/15 text-white/90'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Wallet View */}
      {activeCategory === 'wallet' ? (
        <div className="space-y-3">
          {claimedVouchers.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-black/40 border border-white/10">
              <span className="text-4xl">🎟️</span>
              <h4 className="text-base font-bold text-white mt-2">No Claimed Vouchers Yet</h4>
              <p className="text-sm text-white/70 mt-1.5">
                Take desk breaks to accumulate points and unlock real brand rewards!
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 px-5 py-2.5 rounded-xl text-sm font-bold bg-white/15 hover:bg-white/20 text-white"
              >
                Browse Real-Life Coupons
              </button>
            </div>
          ) : (
            claimedVouchers.map((cv, i) => (
              <div
                key={i}
                onClick={() => setActiveWalletVoucher(cv)}
                className="p-4 rounded-2xl bg-black/50 border border-white/15 hover:border-emerald-400/50 cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-13 h-13 rounded-xl flex items-center justify-center p-1.5 shadow-md border border-white/10"
                    style={{ backgroundColor: `${cv.brandColor}25` }}
                  >
                    <BrandLogo brand={cv.brand} size={30} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-emerald-400">{cv.brand}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                        Active
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-0.5">{cv.title}</h4>
                    <div className="font-mono text-sm text-white/90 mt-1 bg-white/10 px-2.5 py-0.5 rounded inline-block">
                      Code: {cv.couponCode}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-400 whitespace-nowrap">View Barcode &gt;</span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Vouchers Catalog */
        <div className="space-y-3.5">
          {filteredVouchers.map((voucher) => {
            const canAfford = user.points >= voucher.pointsRequired;
            const isTargetGoal = user.targetVoucherId === voucher.id;

            return (
              <div
                key={voucher.id}
                className={`p-4.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isTargetGoal
                    ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
                    : 'bg-white/[0.04] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Real Official Company Logo Badge */}
                  <div
                    className="w-13 h-13 rounded-xl flex-shrink-0 flex items-center justify-center p-1.5 shadow-md border border-white/15"
                    style={{
                      backgroundColor: `${voucher.brandColor}25`,
                      color: voucher.brandColor,
                    }}
                  >
                    <BrandLogo brand={voucher.brand} size={30} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-white">{voucher.brand}</span>
                      {voucher.popular && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🔥 Popular
                        </span>
                      )}
                      {isTargetGoal && (
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-black shadow-sm">
                          🎯 Active Goal
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">{voucher.title}</h4>
                    <p className="text-sm text-white/75 mt-1 leading-relaxed">{voucher.description}</p>
                  </div>

                  <div className="text-right ml-2 flex-shrink-0">
                    <div className="text-xs text-white/60 uppercase font-bold">Value</div>
                    <div className="text-sm font-black text-emerald-400 mt-0.5">{voucher.originalValue}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-lg font-black"
                      style={{ color: theme.primaryColor }}
                    >
                      {voucher.pointsRequired}
                    </span>
                    <span className="text-xs text-white/70 font-bold uppercase">PTS REQUIRED</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Goal target action button */}
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTargetReward?.(voucher.id);
                        soundEngine.playCelebration();
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isTargetGoal
                          ? 'bg-amber-400 text-black shadow-sm'
                          : 'bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/30'
                      }`}
                    >
                      {isTargetGoal ? '✓ Your Goal' : '🎯 Set as Goal'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedVoucherForClaim(voucher);
                        soundEngine.playClick();
                      }}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                        canAfford
                          ? `${theme.buttonClass} shadow-md`
                          : 'bg-white/10 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem Voucher' : `Need ${voucher.pointsRequired - user.points} Pts`}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Claim Confirmation Modal */}
      {selectedVoucherForClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#111827] border border-white/20 p-5 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Confirm Voucher Redemption
              </span>
              <button
                onClick={() => setSelectedVoucherForClaim(null)}
                className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="text-center my-4">
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center p-2 mb-2 shadow-lg border border-white/20"
                style={{ backgroundColor: `${selectedVoucherForClaim.brandColor}33` }}
              >
                <BrandLogo brand={selectedVoucherForClaim.brand} size={38} />
              </div>

              <div className="text-base font-black text-white">{selectedVoucherForClaim.brand}</div>
              <h3 className="text-lg font-bold text-white mt-0.5">{selectedVoucherForClaim.title}</h3>
              <p className="text-sm text-emerald-400 font-black mt-1">Value: {selectedVoucherForClaim.originalValue}</p>
            </div>

            <div className="bg-black/40 p-3.5 rounded-xl border border-white/10 text-sm space-y-2 my-3">
              <div className="flex justify-between text-white/90">
                <span>Voucher Cost:</span>
                <span className="font-bold text-amber-400">
                  {selectedVoucherForClaim.pointsRequired} Points
                </span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Remaining Balance:</span>
                <span className="font-bold text-emerald-400">
                  {user.points - selectedVoucherForClaim.pointsRequired} Points
                </span>
              </div>
            </div>

            <div className="text-sm text-white/70 mb-4 leading-relaxed">
              Upon redemption, a valid coupon code &amp; digital barcode will be added to your
              wallet.
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedVoucherForClaim(null)}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-white/10 text-white hover:bg-white/15"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClaimConfirm}
                className={`flex-1 py-3 rounded-xl text-sm font-black uppercase ${theme.buttonClass}`}
              >
                Confirm &amp; Claim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Barcode / Voucher Modal */}
      {activeWalletVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#111827] border border-white/20 p-6 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveWalletVoucher(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center text-sm"
            >
              ✕
            </button>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center p-2 mb-2 shadow-lg border border-white/20"
                style={{ backgroundColor: `${activeWalletVoucher.brandColor}33` }}
              >
                <BrandLogo brand={activeWalletVoucher.brand} size={36} />
              </div>
              <span className="text-xs tracking-widest text-emerald-400 font-extrabold uppercase">
                OFFICIAL PARTNER VOUCHER
              </span>
              <h3 className="text-2xl font-black mt-1">{activeWalletVoucher.brand}</h3>
              <p className="text-sm text-white/80 mt-1">{activeWalletVoucher.title}</p>
            </div>

            {/* Simulated Digital Barcode */}
            <div className="my-5 p-4 bg-white rounded-2xl text-black flex flex-col items-center justify-center shadow-inner">
              <div className="flex items-center gap-1 h-14 w-full justify-center">
                {[
                  3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 2,
                  1, 4,
                ].map((w, idx) => (
                  <div
                    key={idx}
                    className="bg-black h-full"
                    style={{ width: `${w * 2}px` }}
                  />
                ))}
              </div>
              <div className="font-mono text-sm font-bold tracking-widest mt-2">
                {activeWalletVoucher.couponCode}
              </div>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={() => handleCopyCode(activeWalletVoucher.couponCode)}
              className="w-full py-3 rounded-xl text-sm font-black uppercase tracking-wider bg-emerald-500 text-black hover:bg-emerald-400 flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{copiedCode ? '✓ Copied to Clipboard!' : '📋 Copy Coupon Code'}</span>
            </button>

            {/* Terms list */}
            <div className="mt-4 pt-3 border-t border-white/10 text-sm text-white/75 space-y-1.5 text-left">
              <div className="font-bold text-white">Redemption Terms:</div>
              {activeWalletVoucher.terms.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span>•</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
