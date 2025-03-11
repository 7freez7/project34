// Types for our news data
export interface NewsItem {
    id: number
    title: string
    date: string
    summary: string
    content: string
    imageUrl: string
    galleryImages?: string[] // Optional array of additional images
  }
  
  // Mock data for news items
  const newsData: NewsItem[] = [
    {
      id: 1,
      title: "Spectacular Concert at Kulturák Hodonín",
      date: "2025-02-25T19:00:00Z",
      summary: "A memorable evening of music featuring our talented orchestra and vocalists at the Kulturák Hodonín.",
      content: `<p>The concert hall at Kulturák Hodonín came alive with an extraordinary performance that showcased the remarkable talent of our orchestra and vocalists. The evening featured a diverse program of classical and contemporary pieces, delighting the audience with exceptional musicianship and artistic excellence.</p>
      <p>The stage, beautifully decorated with flowing white fabric and dramatic lighting, provided the perfect backdrop for this memorable performance. Our musicians, dressed in formal attire, demonstrated their mastery of various instruments, from saxophones to trombones, creating a rich and harmonious sound that filled the venue.</p>
      <p>Special recognition goes to our featured vocalists, who captivated the audience with their powerful performances. The combination of instrumental and vocal talents, along with the sophisticated stage design and professional sound setup, made this an unforgettable evening of musical entertainment.</p>`,
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bzgIJRVp1UTZCPPVmQVGRFncXUTN0F.png",
      galleryImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bzgIJRVp1UTZCPPVmQVGRFncXUTN0F.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3DxXtKRp7uvoukVZOMABG4iyBbqdTX.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PNdx6E9vSBti4xmgy8xEX0iAEQ3dNG.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PNdx6E9vSBti4xmgy8xEX0iAEQ3dNG.png"
      ],
    },
    {
      id: 2,
      title: "Company Expands Operations to European Market",
      date: "2025-02-23T14:30:00Z",
      summary:
        "Following our success in North America, we're thrilled to announce our expansion into the European market.",
      content:
        "<p>Our company is taking a major step forward with our expansion into Europe. This strategic move comes after several years of strong growth in North America and increasing demand from European customers.</p><p>The new European headquarters will be located in Berlin, Germany, with additional offices planned for Paris and London within the next year.</p><p>This expansion will create approximately 200 new jobs and allow us to better serve our growing international customer base with localized support and faster response times.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Annual Developer Conference Announced for September",
      date: "2025-02-20T11:15:00Z",
      summary: "Mark your calendars! Our annual developer conference will take place September 15-17 in San Francisco.",
      content:
        "<p>We're pleased to announce that registration is now open for our annual developer conference. This year's event will feature keynote presentations from industry leaders, hands-on workshops, and networking opportunities.</p><p>The three-day conference will cover a wide range of topics including AI integration, performance optimization, and security best practices. Early bird pricing is available until June 1st.</p><p>For those unable to attend in person, all sessions will be livestreamed and made available on-demand following the event.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Q1 Financial Results Exceed Expectations",
      date: "2025-02-15T08:45:00Z",
      summary:
        "Our first quarter financial results show strong growth across all business segments, exceeding analyst predictions.",
      content:
        "<p>We're pleased to report exceptional financial results for the first quarter of 2025. Revenue increased by 28% year-over-year, significantly outpacing the industry average of 12%.</p><p>This growth was driven by strong performance in our enterprise solutions division and the successful launch of our subscription service in December 2024.</p><p>Operating margins also improved by 3.5 percentage points, reflecting our ongoing commitment to operational efficiency and strategic cost management.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      title: "New Partnership Announced with Leading Tech Company",
      date: "2025-02-10T13:20:00Z",
      summary:
        "We've formed a strategic partnership with a leading technology provider to enhance our service offerings.",
      content:
        "<p>Today we're announcing an exciting new partnership that will combine our expertise with cutting-edge technology from one of the industry's most respected companies.</p><p>This collaboration will enable us to offer enhanced capabilities to our customers, including advanced analytics, improved integration options, and expanded platform support.</p><p>The first jointly developed solutions are expected to be available in Q3 2025, with additional offerings planned for early 2026.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      title: "Company Achieves Carbon Neutrality Ahead of Schedule",
      date: "2025-02-05T10:00:00Z",
      summary:
        "We're proud to announce that we've achieved our carbon neutrality goal two years ahead of our original timeline.",
      content:
        "<p>Environmental responsibility has been a core value of our company since its founding, and today we're celebrating a major milestone in our sustainability journey.</p><p>Through a combination of renewable energy investments, operational efficiency improvements, and carbon offset programs, we have achieved carbon neutrality across all global operations.</p><p>This achievement comes two full years ahead of our original 2027 target, demonstrating our commitment to addressing climate change and reducing our environmental impact.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 7,
      title: "New Mobile App Features Enhanced User Experience",
      date: "2025-01-30T15:45:00Z",
      summary:
        "The latest update to our mobile app includes a redesigned interface and several new features requested by users.",
      content:
        "<p>We're excited to announce the release of version 4.0 of our mobile application, featuring a completely redesigned user interface and several highly-requested new features.</p><p>The update includes improved navigation, dark mode support, offline capabilities, and enhanced performance on all devices.</p><p>User feedback was instrumental in shaping this update, with over 80% of the new features coming directly from customer suggestions and requests.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 8,
      title: "Company Named Among Best Places to Work for Third Consecutive Year",
      date: "2025-01-25T09:30:00Z",
      summary: "We're honored to be recognized as one of the best employers in the industry for the third year in a row.",
      content:
        "<p>We're proud to announce that our company has once again been named to the prestigious 'Best Places to Work' list for 2025.</p><p>This recognition reflects our ongoing commitment to creating a positive, inclusive workplace culture that empowers employees and fosters innovation.</p><p>The award is based on anonymous employee feedback, with particularly high scores in the areas of work-life balance, professional development opportunities, and company leadership.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 9,
      title: "Research Team Publishes Groundbreaking Study",
      date: "2025-01-20T14:00:00Z",
      summary: "Our research division has published a landmark study that could transform approaches to data processing.",
      content:
        "<p>Researchers from our advanced technology division have published a groundbreaking study in the Journal of Computational Science.</p><p>The paper details a novel approach to large-scale data processing that demonstrates efficiency improvements of up to 40% compared to current methods.</p><p>This research has significant implications for applications in fields ranging from healthcare to financial services, and represents a major contribution to the broader scientific community.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 10,
      title: "New Customer Success Program Launches",
      date: "2025-01-15T11:30:00Z",
      summary:
        "We're introducing a comprehensive customer success program designed to help clients maximize their results.",
      content:
        "<p>Today marks the official launch of our enhanced Customer Success Program, designed to help organizations of all sizes achieve maximum value from our solutions.</p><p>The program includes personalized onboarding, regular health checks, advanced training options, and dedicated success managers for enterprise customers.</p><p>Early participants in the pilot program reported a 35% increase in feature adoption and a 28% improvement in their key performance metrics.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 11,
      title: "Company Celebrates 10th Anniversary",
      date: "2025-01-10T10:00:00Z",
      summary:
        "This month marks 10 years since our founding, and we're celebrating this milestone with special events and initiatives.",
      content:
        "<p>This January marks a decade since our company was founded with a mission to transform how businesses leverage technology.</p><p>Over the past ten years, we've grown from a small startup with five employees to a global organization serving thousands of customers across 30 countries.</p><p>To celebrate this milestone, we're launching a '10 for 10' initiative, supporting ten charitable organizations selected by our employees with donations of $10,000 each.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 12,
      title: "New Security Features Added to Platform",
      date: "2025-01-05T13:15:00Z",
      summary:
        "We've implemented advanced security enhancements to provide even stronger protection for our customers' data.",
      content:
        "<p>Security has always been a top priority for our company, and today we're announcing significant enhancements to our platform's security capabilities.</p><p>The updates include advanced threat detection, improved authentication options, enhanced encryption, and expanded compliance certifications.</p><p>These improvements reflect our ongoing commitment to protecting customer data and maintaining the highest standards of security in an evolving threat landscape.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 13,
      title: "Company Launches Scholarship Program for STEM Students",
      date: "2024-12-20T09:45:00Z",
      summary:
        "Our new scholarship program will support students pursuing degrees in science, technology, engineering, and mathematics.",
      content:
        "<p>We're proud to announce the launch of our STEM Scholars program, which will provide financial support and mentorship to students from underrepresented groups.</p><p>The program will award 20 scholarships annually, covering up to $10,000 in tuition and educational expenses for students pursuing degrees in STEM fields.</p><p>In addition to financial support, scholarship recipients will be paired with mentors from our company and have access to internship opportunities and professional development resources.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 14,
      title: "New Integration Capabilities Announced",
      date: "2024-12-15T14:30:00Z",
      summary:
        "We've expanded our platform's integration capabilities to connect with even more third-party services and tools.",
      content:
        "<p>Today we're announcing significant enhancements to our platform's integration capabilities, making it easier than ever to connect with the tools and services our customers use every day.</p><p>The update includes 15 new pre-built integrations with popular business applications, an enhanced API for custom integrations, and improved documentation for developers.</p><p>These changes reflect our commitment to providing a flexible, connected experience that fits seamlessly into our customers' existing workflows.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 15,
      title: "Annual User Conference Breaks Attendance Records",
      date: "2024-12-10T11:00:00Z",
      summary:
        "Our recent user conference was the largest in company history, with over 5,000 attendees from around the world.",
      content:
        "<p>Last week's annual user conference was our largest and most successful to date, with more than 5,000 customers, partners, and industry professionals in attendance.</p><p>The three-day event featured 120 sessions, including keynote presentations, technical workshops, customer success stories, and networking opportunities.</p><p>Feedback from attendees has been overwhelmingly positive, with 94% rating the event as 'excellent' or 'very good' in post-conference surveys.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 16,
      title: "Company Opens New Headquarters Building",
      date: "2024-12-05T10:15:00Z",
      summary:
        "We've moved into our new headquarters, a state-of-the-art facility designed to support collaboration and innovation.",
      content:
        "<p>This week marks the official opening of our new global headquarters, a 120,000 square foot facility designed to support our growing team and reflect our company culture.</p><p>The building features flexible workspaces, state-of-the-art meeting facilities, wellness areas, and numerous sustainability features including solar panels and rainwater collection systems.</p><p>The new headquarters will accommodate up to 800 employees and has been designed to support hybrid work arrangements with enhanced video conferencing capabilities throughout.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 17,
      title: "Product Receives Industry Award for Innovation",
      date: "2024-11-30T13:45:00Z",
      summary: "Our flagship product has been recognized with a prestigious industry award for technological innovation.",
      content:
        "<p>We're honored to announce that our flagship product has received the 2024 Innovation Excellence Award from the Technology Innovation Council.</p><p>This prestigious recognition highlights our commitment to pushing the boundaries of what's possible and developing solutions that address real-world challenges in novel ways.</p><p>The award committee specifically cited our unique approach to scalability and the intuitive design of our user interface as key factors in their decision.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 18,
      title: "New Training and Certification Program Launched",
      date: "2024-11-25T09:30:00Z",
      summary:
        "We've introduced a comprehensive training and certification program to help professionals master our platform.",
      content:
        "<p>Today we're launching our expanded Professional Certification Program, designed to help users at all levels develop expertise with our platform and advance their careers.</p><p>The program includes self-paced online courses, instructor-led training sessions, hands-on labs, and rigorous certification exams to validate skills and knowledge.</p><p>Three certification levels are available—Associate, Professional, and Expert—each building on the previous level to develop increasingly advanced capabilities.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 19,
      title: "Company Expands Customer Support Hours",
      date: "2024-11-20T15:00:00Z",
      summary:
        "In response to our growing global customer base, we've extended our support hours to provide 24/7 assistance.",
      content:
        "<p>We're pleased to announce the expansion of our customer support services to 24 hours a day, 7 days a week, effective immediately.</p><p>This enhancement reflects our commitment to serving our global customer base and ensuring that assistance is available whenever and wherever it's needed.</p><p>The expanded coverage is made possible by the addition of new support centers in Sydney and Dublin, complementing our existing locations in San Francisco and Singapore.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 20,
      title: "Quarterly Product Update Introduces Key Enhancements",
      date: "2024-11-15T11:15:00Z",
      summary: "Our latest quarterly update includes performance improvements and several highly-requested features.",
      content:
        "<p>We're excited to announce the release of our Q4 2024 product update, which includes significant performance enhancements and several new features requested by our user community.</p><p>Key improvements include a 30% reduction in processing time for complex operations, enhanced reporting capabilities, new visualization options, and expanded export functionality.</p><p>All customers will be automatically upgraded to the new version over the next two weeks, with no action required on their part.</p>",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  ]
  
  // Function to get all news items, sorted by date (newest first)
  export function getNews(): NewsItem[] {
    return [...newsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  // Function to get a specific news item by ID
  export function getNewsById(id: number): NewsItem | undefined {
    return newsData.find((item) => item.id === id)
  }
  
  