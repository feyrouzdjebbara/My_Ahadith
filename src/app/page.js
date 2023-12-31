import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  
    const response = await fetch(
        'https://api.hadith.gading.dev/books',
        {
           next :{
            revalidate:300 //ISR reload every 2 min 
           }
        }
    )

    const data =await  response.json()
    //  console.log(Ahadith.hadiths)
     const hadith=""
      const books = data.data;
  return (
    <div className="bg-yellow-50 text-right p-6 ">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {books.map(book => (
            <li key={book.id}>
                <Link href={`/book/${book.id}`}>
                    
                        <button class="button-style2">
                            
                            <p className="m-3 text-[18px] font-bold capitalize rtl">({book.name}) {translateBookName(book.id)}</p>
                            
                            <p className="m-3 text-[15px] font-semibold capitalize rtl">  {hadith}({book.available}) عدد الأحاديث  </p>
                            
                        </button>
                    
                </Link>
            </li>
        ))}
    </ul>
</div>


  )
}
const bookNameTranslations = {
  "bukhari": "صحيح البخاري",
  "ahmad": "مسند أحمد",
  "ibnu-majah": "سنن ابن ماجه",
  "muslim": "صحيح مسلم",
  "abu-daud": "سنن أبي داود",
  "tirmidzi": "جامع الترمذي",
  "nasai": "سنن النسائي",
  "darimi": "سنن الدارمي",
  "malik":"مُوَطَّأُ الْإِمَامِ مَالِك"
  
};

function translateBookName(booktId) {
  return bookNameTranslations[booktId] || booktId;
}
