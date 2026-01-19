"use client";

import Image01_Unindexed from "./sections/Image01_Unindexed";
import Image02_Mask from "./sections/Image02_Mask";
import Image03_Mirror from "./sections/Image03_Mirror";
import Image04_Feed from "./sections/Image04_Feed";
import Image05_Mirror from "./sections/Image05_Mirror";
import Image06_TwoSelves from "./sections/Image06_TwoSelves";
import Image07_PostureDebt from "./sections/Image07_PostureDebt";
import Image08_Through from "./sections/Image08_Through";
import SupportContacts from "./ui/SupportContacts";
import InterludeFocus from "./ui/InterludeFocus";

export default function GalleryPage() {
  return (
    <main className="bg-slate-950 text-slate-50">
      <Image01_Unindexed />

    <InterludeFocus
        prevSrc="/img1-raw.png"
        nextSrc="/mask2.png"
        kicker="INTERLUDE"
        title="Authenticity isn’t a personality trait. It’s a nervous system state."
        body="When the world feels unsafe, the self becomes a strategy. Sometimes what looks like confidence is just protection."
        stat="1 in 4 people will experience a mental health problem each year (UK)."
        note="Swap later for your verified source."
        height="240vh"
      />
      <Image02_Mask />


   <InterludeFocus
  prevSrc="/mask2.png"
  nextSrc="/bathroom.png"
  kicker="INTERLUDE"
  title="The mask works. That’s the problem."
  body="At first, the mask feels like relief. The face is steady, the signals are clean, the reaction is predictable.But protection has a side effect: it starts deciding for me. What I show. What I suppress. What I’m allowed to feel. Over time, I stop asking how I actually feel — and start asking which version is safer to display."
  stat="Protective self-presentation reduces anxiety short-term, but increases emotional distance over time."
  note="Identity & emotional regulation research"
  height="240vh"
 />

       <Image03_Mirror />

<InterludeFocus
  prevSrc="/bathroom.png"
  nextSrc="/scrolling2.png"
  kicker="INTERLUDE"
  title="Comparison doesn’t start on the screen."
  body="It starts earlier.In the mirror.In the pause after looking.In the question: “Which version is acceptable?”By the time I start scrolling, my nervous system is already primed.Already searching.Already ready to borrow a standard.The feed doesn’t create the pressure.It just gives it a direction."
  stat="Social comparison is most powerful when internal uncertainty is already present."
  note="Social cognition & comparison research"
  height="240vh"
 />


       <Image04_Feed />

       <InterludeFocus
  prevSrc="/scrolling2.png"
  nextSrc="/mirror-raw.jpg"
  kicker="INTERLUDE"
  title="At some point, comparison turns into adjustment."
  body="Scrolling is passive.Editing is not.Somewhere between those two, a line gets crossed.I stop noticing how I feel — and start noticing what doesn’t match.The light. The angle. The mood. The edges of myself.The feed shows me the standard.Editing is how I try to meet it."
  stat="Social comparison often shifts into self-modification without conscious intent."
  note="Self-regulation & media psychology research"
  height="240vh"
 />


       <Image05_Mirror />

<InterludeFocus
  prevSrc="/mirror-raw.jpg"
  nextSrc="/twosides_raw.jpg"
  kicker="INTERLUDE"
  title="Eventually, I stop posting moments. I start posting versions."
  body="The edit teaches me what works.And then my life starts adapting to it.I don’t ask, “Is this real?”I ask, “Will this pass?”That’s when identity becomes a toggle.Not a feeling — a setting."
  stat="When approval becomes feedback, the self can become a product to optimise."
  note="Media psychology & social reinforcement research"
  height="240vh"
/>





       <Image06_TwoSelves />


       <InterludeFocus
  prevSrc="/twosides-raw.jpg"
  nextSrc="/edit2.png"
  kicker="INTERLUDE"
  title="The edit doesn’t end on the screen."
  body="It follows me into my body.I hunch for hours.I tighten my neck.I collapse my shoulders.Then I open the editor and call it “alignment”.Straighten. Correct. Fix.The photo gets cleaner.The posture gets worse."
  stat="Postural strain builds quietly — especially during long, focused screen work."
  note="Ergonomics & occupational health research"
  height="240vh"
/>

<Image07_PostureDebt />

<InterludeFocus
  prevSrc="/edit2.png"
  nextSrc="/face-raw.png"
  kicker="INTERLUDE"
  title="At some point, the image stops asking to be fixed."
  body="Not because it’s perfect.But because the chase gets louder than the reason.I’ve spent so long adjusting angles, posture, proportions —training my body to fail in real life,just to succeed inside a frame.Shoulders forward. Neck down. Spine bent.Corrected later. Aligned digitally.The body adapts to the edit.The self pays the cost.This is the moment before clarity.Not acceptance.Just the pause where I stop trying to correct myself."
  stat="Prolonged self-modification often precedes emotional disengagement."
  note="Body image & self-objectification research"
  height="220vh"
/>

<Image08_Through />

<InterludeFocus
nextSrc="/face-raw.jpg"
  kicker="FINAL"
  title="Authenticity is not a performance. And struggle is not a failure."
  body="If this experience felt familiar, heavy, or uncomfortable — you’re not alone.Mental health struggles don’t mean something is wrong with you.They mean something needs care.You don’t have to optimise yourself to deserve help.You don’t have to explain your pain in perfect words.And you don’t have to go through it quietly.Authenticity begins where comparison ends.Care begins where silence breaks."
  stat="If you’re struggling, reaching out is a strength — not a weakness."
  note="Support resources below"
  height="220vh"
/>


<SupportContacts />

    </main>
  );
}
