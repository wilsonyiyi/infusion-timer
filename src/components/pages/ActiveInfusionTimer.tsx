import { useStore } from "../../store/useStore";
import { useEffect, useState } from "preact/hooks";
import { useLocation } from "wouter-preact";
import { Modal, useModal } from "../../components/ui/Modal";

export function ActiveInfusionTimer() {
  const {
    pauseInfusion,
    resumeInfusion,
    completeInfusion,
    clearCurrentRecord,
    adjustEstimate,
    isRunning,
    isPaused,
    isCompleted,
    startTime,
    totalPausedDuration,
    estimatedMinutes,
    volume,
  } = useStore();
  const [, navigate] = useLocation();
  const deleteModal = useModal();
  const [remainingMinutes, setRemainingMinutes] = useState(estimatedMinutes);
  const [liquidLevel, setLiquidLevel] = useState(100);
  const [warningLevel, setWarningLevel] = useState<
    "low" | "medium" | "high" | null
  >(null);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [showSafetyAlert, setShowSafetyAlert] = useState(false);
  const [safetyAlertDismissed, setSafetyAlertDismissed] = useState(false);

  const generateScaleMarks = (volume: number) => {
    return Array.from({ length: 5 }, (_, i) =>
      Math.round(volume * (1 - i * 0.25))
    );
  };

  useEffect(() => {
    if (!isRunning || isPaused || !startTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const elapsedMs = now - startTime - totalPausedDuration;
      const elapsedMinutes = elapsedMs / 60000;
      const remaining = Math.max(0, estimatedMinutes - elapsedMinutes);
      setRemainingMinutes(remaining);

      const progress = Math.min(100, (elapsedMinutes / estimatedMinutes) * 100);
      setLiquidLevel(100 - progress);

      const previousWarningLevel = warningLevel;
      if (remaining <= 5 && remaining > 0) {
        setWarningLevel("high");
        // Only show alert if entering high level or previously dismissed
        if (previousWarningLevel !== "high" || safetyAlertDismissed) {
          setShowSafetyAlert(true);
          setSafetyAlertDismissed(false);
        }
      } else if (remaining <= 10 && remaining > 5) {
        setWarningLevel("medium");
        // Only show alert if entering medium level from no warning or previously dismissed
        if ((previousWarningLevel !== "medium" && previousWarningLevel !== "high") || safetyAlertDismissed) {
          setShowSafetyAlert(true);
          setSafetyAlertDismissed(false);
        }
      } else {
        setWarningLevel(null);
        setShowSafetyAlert(false);
        setSafetyAlertDismissed(false);
      }

      if (remaining <= 0 && isRunning && !isCompleted) {
        completeInfusion();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [
    isRunning,
    isPaused,
    startTime,
    totalPausedDuration,
    estimatedMinutes,
    isCompleted,
    completeInfusion,
  ]);

  useEffect(() => {
    if (isCompleted && !showCompletionAnimation) {
      setShowCompletionAnimation(true);
      setLiquidLevel(0);
    }
  }, [isCompleted, showCompletionAnimation]);

  const handleStartNew = () => {
    clearCurrentRecord();
    navigate("/");
  };

  const handleDeleteRecord = () => {
    deleteModal.open();
  };

  const confirmDelete = () => {
    clearCurrentRecord();
    navigate("/");
    deleteModal.close();
  };

  const cancelDelete = () => {
    deleteModal.close();
  };

  const warningMessage = () => {
    if (warningLevel === "high") {
      return "建议提前通知护士";
    } else if (warningLevel === "medium") {
      return "接近结束，请留意回血";
    }
    return null;
  };

  return (
    <>
      <Modal
        isOpen={deleteModal.isOpen}
        title="确认删除"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmText="确认删除"
        cancelText="取消"
        confirmButtonClass="bg-red-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all"
      >
        <p class="text-slate-600 text-center leading-relaxed">
          确定要删除本次记录吗？
        </p>
        <p class="text-sm text-slate-500 mt-2">
          这将清除所有计时数据，包括校准信息、滴速测量等设置。
        </p>
      </Modal>

      <div class="min-h-screen flex flex-col bg-medical-bg text-slate-900 font-display">
      {isCompleted ? (
        <>
          <div class="flex items-center p-4 pb-2 justify-center sticky top-0 z-10 bg-medical-bg/80 backdrop-blur-sm">
            <h2 class="text-slate-900 text-lg font-bold leading-tight flex-1 text-center">
              输液完成
            </h2>
          </div>

          <div class="flex flex-col items-center px-4 py-8">
            <div
              class={`relative w-24 h-24 mb-6 ${
                showCompletionAnimation ? "animate-bounce-in" : ""
              }`}
            >
              <div class="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
              <div
                class="absolute inset-2 bg-green-500/30 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div class="absolute inset-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg
                  class="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    class={showCompletionAnimation ? "check-draw" : ""}
                  />
                </svg>
              </div>
            </div>

            <h1 class="text-slate-900 tracking-tight text-[40px] font-bold leading-tight text-center mb-2">
              输液完成
            </h1>
            <p class="text-slate-500 text-base text-center mb-10 max-w-[280px] leading-relaxed">
              您的输液治疗已顺利完成，感谢您的配合
            </p>

            <div class="flex w-full grow justify-center items-start relative min-h-[320px]">
              <div class="absolute top-0 w-1 h-8 bg-slate-300 rounded-full"></div>
              <div class="relative mt-8 flex flex-col items-center">
                <div class="w-16 h-8 bg-white/60 border border-white/80 rounded-t-2xl flex justify-center items-center shadow-sm relative z-20">
                  <div class="w-4 h-4 rounded-full bg-slate-200/50 border border-slate-300/50"></div>
                </div>

                <div class="relative w-44 h-72 bg-white/30 border-2 border-white/90 rounded-[40px] rounded-b-[60px] overflow-hidden flex flex-col-reverse -mt-1 z-10 backdrop-blur-md">
                  <div
                    class="w-full relative shadow-[inset_0_2px_10px_rgba(255,255,255,0.5)] transition-all duration-1000"
                    style={{
                      height: "0%",
                      background:
                        "linear-gradient(180deg, rgba(77, 208, 225, 0.3) 0%, rgba(45, 124, 246, 0.2) 100%)",
                      borderRadius: "40% 40% 0 0",
                      opacity: 0.3,
                    }}
                  >
                    <div class="absolute bottom-2 left-1/4 w-1 h-1 bg-white/30 rounded-full"></div>
                  </div>

                   <div class="absolute inset-0 flex flex-col justify-between py-10 pr-4 items-end pointer-events-none opacity-30">
                     {generateScaleMarks(volume).map((mark, i) => (
                       <div key={mark} class="flex items-center gap-1">
                         <span class="text-[8px] font-bold text-slate-400">
                           {mark}
                         </span>
                         <div
                           class={`w-4 h-[1px] bg-slate-400 ${
                             i % 2 === 0 ? "" : "ml-6"
                           }`}
                         ></div>
                       </div>
                     ))}
                   </div>

                  <div class="absolute inset-y-0 left-6 w-4 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
                  <div class="absolute inset-y-0 left-2 w-[1px] bg-white/40"></div>
                  <div class="absolute inset-y-0 right-2 w-[1px] bg-white/40"></div>
                </div>

                <div class="w-10 h-10 bg-white/80 border border-white/90 rounded-b-xl -mt-2 shadow-md flex flex-col items-center justify-center z-20">
                  <div class="w-4 h-6 bg-slate-200/60 border border-slate-300/40 rounded-b-sm"></div>
                </div>

                <div class="mt-4 flex flex-col items-center">
                  <div class="w-6 h-12 bg-white/40 border border-white/80 rounded-full backdrop-blur-sm relative overflow-hidden">
                    <div class="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-slate-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-auto px-6 pb-10 flex flex-col items-center gap-4">
            <button
              onClick={handleStartNew}
              class="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              开始新的输液
            </button>
          </div>

          <style>{`
            .check-draw {
              stroke-dasharray: 50;
              stroke-dashoffset: 50;
              animation: drawCheck 0.6s ease-out 0.3s forwards;
            }
            @keyframes drawCheck {
              to {
                stroke-dashoffset: 0;
              }
            }
            .animate-bounce-in {
              animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            @keyframes bounceIn {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              50% {
                transform: scale(1.2);
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
            .animate-pulse-slow {
              animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse-slow {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.8;
              }
            }
            .animate-pulse-fast {
              animation: pulse-fast 0.8s ease-in-out infinite;
            }
            @keyframes pulse-fast {
              0%, 100% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.02);
                opacity: 0.9;
              }
            }
          `}</style>
        </>
      ) : (
        <>
          <div class="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-medical-bg/80 backdrop-blur-sm">
            <h2 class="text-slate-900 text-lg font-bold leading-tight flex-1 text-center">
              实时输液计时
            </h2>
          </div>

          <div class="flex flex-col items-center px-4">
            <h1 class="text-slate-900 tracking-tight text-[36px] font-bold leading-tight text-center pb-1 pt-6">
              约 {Math.ceil(remainingMinutes)} 分钟
            </h1>
            <div class="flex items-center gap-2 mb-8">
              <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <p class="text-primary font-semibold text-sm tracking-wide uppercase">
                {isPaused ? "已暂停" : "滴注中"}
              </p>
            </div>
          </div>

          <div class="flex w-full grow p-4 justify-center items-start relative min-h-[400px]">
            <div class="absolute top-0 w-1 h-8 bg-slate-300 rounded-full"></div>
            <div class="relative mt-8 flex flex-col items-center">
              <div class="w-16 h-8 bg-white/60 border border-white/80 rounded-t-2xl flex justify-center items-center shadow-sm relative z-20">
                <div class="w-4 h-4 rounded-full bg-slate-200/50 border border-slate-300/50"></div>
              </div>

              <div class="relative w-44 h-72 bg-white/30 border-2 border-white/90 rounded-[40px] rounded-b-[60px] overflow-hidden flex flex-col-reverse -mt-1 z-10 backdrop-blur-md">
                <div
                  class="w-full relative shadow-[inset_0_2px_10px_rgba(255,255,255,0.5)] transition-all duration-1000"
                  style={{
                    height: `${liquidLevel}%`,
                    background:
                      "linear-gradient(180deg, rgba(77, 208, 225, 0.8) 0%, rgba(45, 124, 246, 0.6) 100%)",
                    borderRadius: "40% 40% 0 0",
                  }}
                >
                  <div class="absolute top-2 left-1/4 w-1 h-1 bg-white/40 rounded-full"></div>
                  <div class="absolute top-6 left-2/3 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                </div>

                 <div class="absolute inset-0 flex flex-col justify-between py-10 pr-4 items-end pointer-events-none opacity-40">
                   {generateScaleMarks(volume).map((mark, i) => (
                     <div key={mark} class="flex items-center gap-1">
                       <span class="text-[8px] font-bold text-slate-400">
                         {mark}
                       </span>
                       <div
                         class={`w-4 h-[1px] bg-slate-400 ${
                           i % 2 === 0 ? "" : "ml-6"
                         }`}
                       ></div>
                     </div>
                   ))}
                 </div>

                <div class="absolute inset-y-0 left-6 w-4 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
                <div class="absolute inset-y-0 left-2 w-[1px] bg-white/40"></div>
                <div class="absolute inset-y-0 right-2 w-[1px] bg-white/40"></div>
              </div>

              <div class="w-10 h-10 bg-white/80 border border-white/90 rounded-b-xl -mt-2 shadow-md flex flex-col items-center justify-center z-20">
                <div class="w-4 h-6 bg-slate-200/60 border border-slate-300/40 rounded-b-sm"></div>
              </div>

              <div class="mt-4 flex flex-col items-center">
                <div class="w-6 h-12 bg-white/40 border border-white/80 rounded-full backdrop-blur-sm relative overflow-hidden">
                  <div class="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-slate-400"></div>
                  <div
                    class={`absolute inset-0 flex items-center justify-center ${
                      !isPaused ? "animate-bounce" : ""
                    }`}
                  >
                    <span class="text-primary text-xl">💧</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 py-6">
            <p class="text-center text-slate-400 text-xs font-medium uppercase tracking-[0.1em] mb-4">
              流速校准
            </p>
            <div class="flex gap-4">
              <button
                onClick={() => adjustEstimate(1)}
                class="flex-1 flex flex-col items-center justify-center rounded-2xl h-16 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors active:scale-95"
              >
                <span class="text-sm font-bold">感觉变慢了</span>
                <span class="text-[10px] text-slate-400 font-medium">
                  +1分钟
                </span>
              </button>
              <button
                onClick={() => adjustEstimate(-1)}
                class="flex-1 flex flex-col items-center justify-center rounded-2xl h-16 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors active:scale-95"
              >
                <span class="text-sm font-bold">感觉变快了</span>
                <span class="text-[10px] text-slate-400 font-medium">
                  -1分钟
                </span>
              </button>
            </div>
          </div>

          <div class="mt-auto px-6 pb-10 flex flex-col items-center gap-4">
            <button
              onClick={isPaused ? resumeInfusion : pauseInfusion}
              class="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
            >
              {isPaused ? "继续计时" : "暂停计时"}
            </button>
            <button
              onClick={handleDeleteRecord}
              class="w-full bg-white text-red-600 font-bold py-3 rounded-2xl border border-red-200 shadow-sm active:scale-[0.98] transition-all hover:bg-red-50"
            >
              删除本次记录
            </button>
          </div>

          {/* Centered Floating Safety Alert */}
          {showSafetyAlert && (
            <div class="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
              <div class="bg-white rounded-2xl border-2 border-red-200 shadow-2xl p-4 max-w-md mx-4 animate-pulse-fast pointer-events-auto transform animate-bounce-in">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div class="bg-red-100 p-3 rounded-full animate-pulse flex-shrink-0">
                      <svg
                        class="w-6 h-6 text-red-600 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="text-red-600 text-sm font-bold">输液即将结束</span>
                      <p class="text-slate-700 text-sm leading-tight truncate font-medium">
                        {warningMessage()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
}
