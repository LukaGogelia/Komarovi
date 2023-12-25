// import HomeOne from "@/components/homes/home";
import Header from "../layout/headers/Header";
import { useTranslations } from "next-intl";
import FooterThree from "../layout/footers/FooterThree";
// import MobileMenu from "@/components/layout/component/MobileMenu";
import PrincipalHero from "../homes/heros/PrincipalHero";
import ServerMenu from "../layout/component/ServerMenu";

import Preloader from "@/components/common/Preloader";

export const metadata = {
    title: 'Home-1 || Educrat - Professional LMS Online Education Course NextJS Template',
    description:
        'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',

}

export default function Principal() {
    const t = useTranslations("/");
    const foooterText = {

        CallUs: t("CallUs"),
        Address: t("Address"),
        About: t("About"),
        AboutUs: t("AboutUs"),
        ContactUs: t("ContactUs"),
        Categories: t("Categories"),
        Subject1: t("Subject1"),
        Subject2: t("Subject2"),
        Subject3: t("Subject3"),
        Subject4: t("Subject4"),
        Subject5: t("Subject5"),
        Subject7: t("Subject7"),
        Subject8: t("Subject8"),
        Subject9: t("Subject9"),
        Subject10: t("Subject10"),
        Subject11: t("Subject11"),
        Subject12: t("Subject12"),
        Subject13: t("Subject13"),
        Subject14: t("Subject14"),
        Subject15: t("Subject15"),
        Subject16: t("Subject16"),
        Weekend: t("Weekend"),
        Stem: t("Stem"),
        Evening: t("Evening"),
        Projects: t("Projects"),
    };
    return (

        <>
            <Preloader />
            <Header><ServerMenu allClasses={"menu__nav text-white -is-active"} /></Header>

            <div className="content-wrapper  js-content-wrapper overflow-hidden">

                <div>
                    <PrincipalHero />
                </div>
                <div className="px-5">
                    <p>ძვირფასო მოსწავლეებო, მშობლებო, მასწავლებლებო,



                        მოგესალმებით კომაროვის სკოლის სახელით და მოხარული ვარ, რომ ჩვენი დიდი ერთობის ნაწილი ხართ ან სულ მალე გახდებით. მე მჯერა, რომ სწორედ თქვენი, ჩვენი მოსწავლეების, მშობლების, მასწავლებლებისა და თანამშრომლების მუდმივი სწრაფვა განვითარებისკენ ქმნის კომაროვის სკოლის უნიკალურობას და საფუძვლად უდევს მის ყველა წარმატებას.



                        ჩემთვის, როგორც კომაროვის კურსდამთავრებულისთვის, ეს სკოლა ადგილია, სადაც შრომა, თავისუფალი აზროვნება და სწორი ღირებულებები ხვდება ერთმანეთს. ჩვენთან აფასებენ შრომას და დისციპლინას. სწორედ მათი საშუალებით ჩვენი მოსწავლეები იძინენ ისეთი უნარებს, რომლებიც მათ შესაძლებლობას აძლევს, შეაღონ ნებისმიერი კარი ნებისმიერ ადგილას და ნებისმიერ პროფესიაში. ჩვენი კურსდამთავრებულები წარმატებით მოღვაწეობენ როგორც ტექნიკურ და ჰუმანიტარულ მეცნიერებებში, ისე ბიზნესსა თუ მედიცინაში. კომაროველები არ უშინდებიან ახალ გამოწვევებს და მათ ისევე წარმატებით უმკალვდებიან, როგორც სკოლაში რთულ ამოცანებს.



                        მე მჯერა, რომ კომაროვის წარმატების 55-წლიანი ფორმულა განვითარებაზე მუდმივ ზრუნვაშია. ჩვენი გუნდის ყველა წევრი ყოველთვის ცდილობს, მეტი ისწავლოს, განვითარდეს და მზადაა ახალი გამოწვევების მისაღებად. ამ გუნდს სჯერა, რომ ყოველდღიურად ცვალებად მსოფლიოში მთავარი უნარი სწორედ უწყვეტი განვითარება და სწრაფად ადაპტირების უნარია, რასაც ჩვენს მოსწავლეებსაც სკოლის ასაკიდანვე ვაჩვევთ. ამიტომ, კომაროვის სკოლაში მუდმივად იხვეწება როგორც აკადემიური, ისე არასასკოლო პროგრამები, ვითარდება ინფრასტრუქტურა და იქმნება ახალი პროექტები, რაც მოსწავლეებს ახალ სირთულეებთან შეჭიდების შესაძლებლობას აძლევს.



                        ცვლილებებთან ერთად, ჩვენ გვჯერა, რომ არსებობს პრინციპები და ღირებულებები, რომლებიც ფუნდამენტურია. ეს არის ეროვნული, სახელმწიფოებრივი და ზოგადსაკაცობრიო ღირებულებები, განსხვავებული აზრის პატივისცემა და თავისუფალი და კრიტიკული აზროვნება. ჩვენ ყველა მოსწავლეს ვუზიარებთ ამ პრინციპებს. ამიტომ, კომაროვის კურსდამთავრებულები ქმნიან თაობას, რომელიც აზროვნებს სახელმწიფოებრივად, უსმენს და პატივს სცემს სხვას და რაც მთავარია, ფიქრობს საზღვრების გარეშე, სვამს შეკითხვებს და ეძებს პასუხებს.



                        მე დარწმუნებული ვარ, რომ ამ მიზნების მისაღწევად მათემატიკა და ფიზიკა საუკეთესო საშუალებაა. ამ დისციპლინების სწავლით ჩვენი მოსწავლეები იძენენ ყველა ზემოთ ჩამოთვლილ თვისებას. შრომა, განვითარება, დაბრკოლებების გადალახვა, თავისუფლად და კრეატიულად აზროვნება და სხვებთან თანამშრომლობა მათემატიკისა და ფიზიკის აუცილებელი ნაწილებია და სწორედ ამიტომ კომაროვის სკოლაში უმაღლესი ხარისხის ზოგად განათლებასთან ერთად, ჩვენი მოსწავლეები იღებენ საუკეთესო განათლებას მათემატიკისა და ფიზიკის მიმართულებით.



                        მიუხედავად იმისა, რომ დღეს კომაროვის სკოლა ლიდერი საგანმანათლებლო დაწესებულებაა, ჩვენ გაჩერებას არ ვაპირებთ და მუდმივად მომავლისკენ ვიყურებით. ამიტომ, ნიჭიერ ახალგაზრდებს, რომლებიც სულ მალე ეროვნული და გლობალური ლიდერები გახდებიან, ახლავე ვიწვევთ ამ გზის ჩვენთან ერთად გასავლელად.



                        შეხვედრამდე კომაროვის სკოლაში,

                        ივანე კვიტაშვილი

                    </p>
                </div>
                {/* <Brands />
                <Categories />
                <Courses />
                <TestimonialsOne />
                <FeaturesOne />
                <WhyCourse />
                <Instructors />
                <GetApp />
                <Blog />
                <Join /> */}
                <FooterThree foooterText={foooterText} />


            </div>
        </>
    );
}
