const EVENTS = [
 {id:"street-food",title:"The Great Street Food Evening",category:"Food",date:"2026-11-14",dateLabel:"November 14, 2026",time:"4:00 PM – 10:00 PM",venue:"Ekamra Haat, Bhubaneswar",price:199,image:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85",description:"Explore regional favourites, classic street-food stalls and local flavours at a lively evening food gathering.",featured:true},
 {id:"tech-forum",title:"Technology & Innovation Forum",category:"Technology",date:"2026-11-21",dateLabel:"November 21, 2026",time:"10:00 AM – 4:00 PM",venue:"KIIT Convention Centre, Bhubaneswar",price:0,image:"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=85",description:"A conference for students and curious minds, featuring talks and demonstrations on web technology, AI and new ideas.",featured:true},
 {id:"art-exhibition",title:"Indian Art & Heritage Exhibition",category:"Art",date:"2026-11-28",dateLabel:"November 28, 2026",time:"11:00 AM – 7:00 PM",venue:"Regional Art Centre, Bhubaneswar",price:149,image:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=85",description:"A curated exhibition of paintings, photography and contemporary artwork. Meet artists and explore creative traditions.",featured:true},
 {id:"acoustic-night",title:"Acoustic & Classical Music Night",category:"Music",date:"2026-12-05",dateLabel:"December 5, 2026",time:"6:00 PM – 10:30 PM",venue:"Rabindra Mandap, Bhubaneswar",price:599,image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85",description:"An elegant evening of acoustic performances and instrumental arrangements in a classic concert setting.",featured:true},
 {id:"design-lab",title:"Creative Design Workshop",category:"Technology",date:"2026-12-12",dateLabel:"December 12, 2026",time:"2:00 PM – 6:00 PM",venue:"WorkLab Studio, Bhubaneswar",price:99,image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",description:"A practical workshop where participants sketch, prototype and share ideas for digital products.",featured:false},
 {id:"heritage-walk",title:"Old Town Heritage Walk",category:"Community",date:"2026-12-19",dateLabel:"December 19, 2026",time:"7:00 AM – 10:00 AM",venue:"Old Town, Bhubaneswar",price:0,image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85",description:"Explore historic streets, architecture and local stories on a relaxed guided community walk.",featured:false},
 {id:"dinner-evening",title:"Classic Dinner & Culinary Evening",category:"Food",date:"2027-01-09",dateLabel:"January 9, 2027",time:"7:00 PM – 9:30 PM",venue:"The Courtyard, Bhubaneswar",price:449,image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",description:"Enjoy a seasonal multi-course dinner in a welcoming setting with good food and conversation.",featured:false},
 {id:"photo-trail",title:"Photography Walk & Showcase",category:"Art",date:"2027-01-16",dateLabel:"January 16, 2027",time:"9:00 AM – 1:00 PM",venue:"Museum Campus, Bhubaneswar",price:99,image:"https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1000&q=85",description:"Join a guided photo walk and discover a showcase of local photography. All experience levels are welcome.",featured:false}
];
const $ = id => document.getElementById(id);
const read = key => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const save = (key,value) => localStorage.setItem(key,JSON.stringify(value));
const priceText = price => price === 0 ? "Free" : `₹${price}`;
let currentFilter = "All";

function updateBookingCount(){ $("bookingCount").textContent = read("orbitgather-bookings").length; }
function makeCard(event){
 const isSaved = read("orbitgather-favourites").includes(event.id);
 return `<article class="event-card"><div class="event-image" style="background-image:url('${event.image}')"><span class="event-tag">${event.category}</span><button class="favourite ${isSaved?"saved":""}" data-favourite="${event.id}" aria-label="Save ${event.title}">${isSaved?"♥":"♡"}</button></div><div class="event-info"><h3>${event.title}</h3><div class="event-meta">▣ ${event.dateLabel}　⌖ ${event.venue.split(",")[0]}</div><p>${event.description}</p><div class="event-foot"><span>${priceText(event.price)}</span><a href="#eventDetail" data-detail="${event.id}">Details ↗</a></div></div></article>`;
}
function renderCards(target,events){ $(target).innerHTML = events.map(makeCard).join(""); }
function navigate(pageId){
 document.querySelectorAll(".page").forEach(page=>page.classList.toggle("active",page.id===pageId));
 document.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("active",link.dataset.view===pageId));
 $("mainNav").classList.remove("open");
 window.scrollTo({top:0,behavior:"smooth"});
 if(pageId==="discover") renderDiscover();
 if(pageId==="bookings") renderBookings();
}
function renderDiscover(){
 const term=$("eventSearch").value.trim().toLowerCase();
 let list=EVENTS.filter(event=>(currentFilter==="All"||(currentFilter==="Free"?event.price===0:event.category===currentFilter)) && (`${event.title} ${event.category} ${event.venue} ${event.description}`).toLowerCase().includes(term));
 const sort=$("sortEvents").value;
 if(sort==="name") list.sort((a,b)=>a.title.localeCompare(b.title));
 if(sort==="price") list.sort((a,b)=>a.price-b.price);
 if(sort==="date") list.sort((a,b)=>a.date.localeCompare(b.date));
 renderCards("allEvents",list);
 $("resultsLabel").textContent=`${list.length} event${list.length===1?"":"s"} found`;
 $("emptyEvents").hidden=list.length!==0;
}
function openDetails(id){
 const event=EVENTS.find(item=>item.id===id); if(!event)return;
 const saved=read("orbitgather-favourites").includes(id);
 $("detailContent").innerHTML=`<div class="detail-layout"><img src="${event.image}" alt="${event.title}"><div class="detail-copy"><p class="kicker">${event.category.toUpperCase()} / ORBITGATHER PICKS</p><h1>${event.title}</h1><p>${event.description}</p><div class="detail-facts"><div><small>DATE</small><b>${event.dateLabel}</b></div><div><small>TIME</small><b>${event.time}</b></div><div><small>VENUE</small><b>${event.venue}</b></div><div><small>ENTRY</small><b>${priceText(event.price)}</b></div></div><button class="button" data-register="${event.id}">Register for this event ↗</button> <button class="button" style="background:var(--navy)" data-favourite="${event.id}">${saved?"♥ Saved":"♡ Save event"}</button><p class="kicker" style="margin-top:18px">DEMO EVENT — NOT AN OFFICIAL TICKET</p></div></div>`;
 navigate("eventDetail");
}
function beginRegistration(id){
 const event=EVENTS.find(item=>item.id===id); if(!event)return;
 $("registrationForm").reset();
 $("registrationForm").hidden=false;
 $("registrationConfirmation").hidden=true;
 $("registrationError").textContent="";
 $("registrationEventName").textContent=`${event.title} · ${event.dateLabel} · ${priceText(event.price)}`;
 $("registrationForm").dataset.eventId=event.id;
 navigate("register");
}
function renderBookings(){
 const bookings=read("orbitgather-bookings");
 $("bookingList").innerHTML=bookings.map(item=>`<article class="booking-row"><img src="${item.image}" alt=""><div><h3>${item.eventTitle}</h3><p>${item.dateLabel} · ${item.venue}<br>${item.name} · ${item.email}</p></div><button data-remove="${item.id}">Remove</button></article>`).join("");
 $("emptyBookings").hidden=bookings.length>0;
 $("bookingList").hidden=bookings.length===0;
 updateBookingCount();
}

document.addEventListener("click",event=>{
 const view=event.target.closest("[data-view]");
 if(view){event.preventDefault();navigate(view.dataset.view);return;}
 const category=event.target.closest("[data-category]");
 if(category){currentFilter=category.dataset.category;document.querySelectorAll("[data-filter]").forEach(button=>button.classList.toggle("active",button.dataset.filter===currentFilter));navigate("discover");return;}
 const detail=event.target.closest("[data-detail]");
 if(detail){event.preventDefault();openDetails(detail.dataset.detail);return;}
 const register=event.target.closest("[data-register]");
 if(register){beginRegistration(register.dataset.register);return;}
 const favourite=event.target.closest("[data-favourite]");
 if(favourite){
  const id=favourite.dataset.favourite;let saved=read("orbitgather-favourites");
  saved=saved.includes(id)?saved.filter(item=>item!==id):[...saved,id];save("orbitgather-favourites",saved);
  document.querySelectorAll(`[data-favourite="${id}"]`).forEach(button=>{button.classList.toggle("saved",saved.includes(id));button.textContent=saved.includes(id)?"♥":"♡";});
  return;
 }
 const remove=event.target.closest("[data-remove]");
 if(remove&&confirm("Remove this registration?")){save("orbitgather-bookings",read("orbitgather-bookings").filter(item=>item.id!==remove.dataset.remove));renderBookings();}
});
$("filterRow").addEventListener("click",event=>{
 const button=event.target.closest("[data-filter]");if(!button)return;
 currentFilter=button.dataset.filter;
 document.querySelectorAll("[data-filter]").forEach(item=>item.classList.toggle("active",item===button));
 renderDiscover();
});
$("eventSearch").addEventListener("input",renderDiscover);
$("sortEvents").addEventListener("change",renderDiscover);
$("homeSearch").addEventListener("submit",event=>{
 event.preventDefault();$("eventSearch").value=$("homeQuery").value;currentFilter="All";
 document.querySelectorAll("[data-filter]").forEach(item=>item.classList.toggle("active",item.dataset.filter==="All"));
 navigate("discover");
});
$("registrationForm").addEventListener("submit",event=>{
 event.preventDefault();
 const form=event.currentTarget, eventId=form.dataset.eventId;
 const chosen=EVENTS.find(item=>item.id===eventId);
 const name=$("attendeeName").value.trim(),email=$("attendeeEmail").value.trim(),phone=$("attendeePhone").value.trim();
 const error=$("registrationError");error.textContent="";
 if(!chosen){error.textContent="Please choose an event before registering.";return;}
 if(name.length<2){error.textContent="Please enter your full name.";return;}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){error.textContent="Please enter a valid email address.";return;}
 if(!/^[0-9+\-\s()]{10,15}$/.test(phone)){error.textContent="Please enter a valid phone number (10–15 characters).";return;}
 if(!$("attendeeConsent").checked){error.textContent="Please tick the consent checkbox.";return;}
 const bookings=read("orbitgather-bookings");
 if(bookings.some(item=>item.eventId===eventId&&item.email.toLowerCase()===email.toLowerCase())){error.textContent="This email is already registered for this event.";return;}
 bookings.push({id:String(Date.now()),eventId,eventTitle:chosen.title,dateLabel:chosen.dateLabel,venue:chosen.venue,image:chosen.image,name,email,phone});
 save("orbitgather-bookings",bookings);
 form.hidden=true;
 $("registrationConfirmation").hidden=false;
 $("registrationConfirmation").innerHTML=`<strong>✓ Registration confirmed!</strong><br>Thanks, ${name}. Your registration for <b>${chosen.title}</b> has been saved in this browser.<br><br><button class="button" data-view="bookings">View my registrations →</button>`;
 updateBookingCount();
});
$("newsletterForm").addEventListener("submit",event=>{
 event.preventDefault();const email=$("newsletterEmail").value.trim();
 let list=read("orbitgather-newsletter");if(!list.includes(email))list.push(email);
 save("orbitgather-newsletter",list);$("newsletterMessage").textContent="You're on the list — thanks for joining!";event.currentTarget.reset();
});
$("themeToggle").addEventListener("click",()=>{
 document.body.classList.toggle("dark");
 const mode=document.body.classList.contains("dark")?"dark":"light";
 localStorage.setItem("orbitgather-theme",mode);
 $("themeToggle").textContent=mode==="dark"?"☀":"◐";
});
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
if(localStorage.getItem("orbitgather-theme")==="dark"){document.body.classList.add("dark");$("themeToggle").textContent="☀";}
$("currentYear").textContent=new Date().getFullYear();
renderCards("featuredEvents",EVENTS.filter(event=>event.featured));
renderDiscover();
updateBookingCount();
