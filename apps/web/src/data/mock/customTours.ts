type RichTextBlock = {
  type: "p";
  children: { text: string }[];
};

type MockRecord = Record<string, any>;

const TOUR_SLUG = "vietnam-autumn-photography-tour-15-days";
const NOW = "1970-01-01T00:00:00.000Z";

function richText(...paragraphs: string[]): RichTextBlock[] {
  return paragraphs.filter(Boolean).map((text) => ({
    type: "p",
    children: [{ text }],
  }));
}

function placeholderImage(title: string) {
  return {
    id: "mock-media-vietnam-autumn-photo-expedition",
    alt: title,
    url: "/media/placeholder.png",
    filename: "placeholder.png",
    mimeType: "image/png",
    filesize: 0,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

function findBySlugOrName(items: MockRecord[], slugs: string[]) {
  return slugs
    .map((slug) =>
      items.find(
        (item) =>
          item.slug === slug ||
          String(item.name || "")
            .toLowerCase()
            .includes(slug.replace(/-/g, " ")),
      ),
    )
    .filter(Boolean);
}

const viDayContent = [
  {
    title: "Đến Hà Nội",
    narrative: [
      "Mở đầu hành trình tại thủ đô lịch sử của Việt Nam",
      "Chào mừng bạn đến Việt Nam. Hướng dẫn viên và tài xế sẽ đón bạn tại sân bay quốc tế Nội Bài, sau đó đưa về khách sạn tại khu Phố Cổ hoặc khu vực Hồ Tây.",
      "Ghi chú: Hà Nội là điểm nghỉ đêm đầu tiên trước khi đoàn di chuyển lên vùng núi đá vôi phía Bắc.",
    ],
    activities: [
      ["Đón sân bay riêng và đưa về khách sạn"],
      ["Nhận phòng khách sạn và nghỉ ngơi"],
      [
        "Tùy chọn dạo quanh hồ Hoàn Kiếm buổi tối để khởi động với nhiếp ảnh đường phố",
      ],
    ],
  },
  {
    title: "Hà Nội đến Bắc Sơn và làng Quỳnh Sơn",
    narrative: [
      "Thung lũng karst ấn tượng và giao lưu văn hóa dân tộc",
      "Đoàn rời Hà Nội từ sớm, di chuyển về phía Bắc tới tỉnh Lạng Sơn, bước vào một trong những vùng thung lũng ngoạn mục nhất của Việt Nam.",
      "Ghi chú: Đỉnh Nà Lay đẹp nhất vào lúc bình minh hoặc cuối buổi chiều. Ánh sáng giữa trưa khá gắt và phẳng, vì vậy khung giờ chụp được sắp xếp phù hợp.",
    ],
    activities: [
      ["Di chuyển buổi sáng từ Hà Nội đến Bắc Sơn", "Khoảng 3 giờ."],
      [
        "Chụp ảnh tại đồng cỏ Hữu Liên",
        "Ánh sáng vàng buổi sáng phủ trên nền thung lũng karst.",
      ],
      [
        "Buổi chiều tại đỉnh Nà Lay",
        "Điểm ngắm toàn cảnh Bắc Sơn với tầm nhìn rộng xuống cánh đồng lúa.",
      ],
      ["Được phép chụp ảnh bằng drone"],
      [
        "Giao lưu văn hóa buổi tối tại làng người Tày Quỳnh Sơn",
        "Biểu diễn hát then truyền thống.",
      ],
      ["Nghỉ đêm tại homestay làng Quỳnh Sơn hoặc thị trấn Bắc Sơn"],
    ],
  },
  {
    title: "Bắc Sơn đến Cao Bằng qua Hạ Lang",
    narrative: [
      "Cung đường vùng cao và nhiếp ảnh đồi núi nhấp nhô",
      "Một ngày di chuyển dài nhưng giàu trải nghiệm qua vùng cao Đông Bắc, với nhiều cơ hội chụp ảnh dọc đường.",
      "Ghi chú: Gò Ba Quang có ánh sáng xiên rất đẹp vào giữa buổi chiều, phù hợp cho chân dung trong bối cảnh phong cảnh và các bố cục góc rộng.",
    ],
    activities: [
      [
        "Chụp ảnh cuối tại thung lũng và ruộng lúa Bắc Sơn vào sáng sớm",
        "Ánh sáng giờ vàng phủ lên thung lũng và cánh đồng.",
      ],
      ["Rời Bắc Sơn khoảng 9:00 sáng"],
      ["Di chuyển tới huyện Hạ Lang, Cao Bằng", "Khoảng 3 đến 4 giờ."],
      [
        "Buổi chiều chụp ảnh tại gò Ba Quang",
        "Gò Ba Quang, các triền đồi mềm mại và khung cảnh bản làng dân tộc.",
      ],
      ["Cuối chiều di chuyển tới thung lũng Phong Nặm", "Nhận phòng và nghỉ ngơi."],
    ],
  },
  {
    title: "Phong Nặm đến núi Mắt Thần và thác Bản Giốc",
    narrative: [
      "Đỉnh núi phủ sương và kỳ quan địa chất hùng vĩ",
      "Một trong những ngày giàu hình ảnh nhất của tour, từ thung lũng núi phủ sương tới một trong những thác nước ấn tượng nhất Đông Nam Á.",
      "Ghi chú: Bản Giốc đẹp nhất từ giữa buổi sáng đến giữa buổi chiều, khi ánh sáng chiếu trực tiếp vào dòng thác. Đối tác chuyên trách sẽ quản lý giấy phép drone và vận hành tại chỗ.",
      "Giấy phép drone: Quyền bay drone độc quyền tại thác Bản Giốc thuộc khu vực biên giới Việt Nam - Trung Quốc. Hiện chỉ có một nhiếp ảnh gia tại Việt Nam được cấp phép quay chụp trên không tại đây.",
    ],
    activities: [
      [
        "Chụp ảnh sáng sớm tại thung lũng Phong Nặm",
        "Sương mù bốc lên trên ruộng bậc thang và các đỉnh núi đá vôi.",
      ],
      [
        "Giữa buổi sáng di chuyển tới núi Mắt Thần",
        "Núi Mắt Thần là một kỳ quan địa chất với cấu trúc đá hình tròn độc đáo.",
      ],
      [
        "Buổi chiều đến thác Bản Giốc",
        "Thác nước lớn nhất trên biên giới Việt Nam - Trung Quốc và là một trong những thác hùng vĩ nhất châu Á.",
      ],
      [
        "Chụp drone tại Bản Giốc",
        "Thực hiện cùng đối tác nhiếp ảnh địa phương độc quyền, hiện là đơn vị duy nhất tại Việt Nam được phép bay tại đây.",
      ],
      [
        "Tùy chọn tham quan động Ngườm Ngao",
        "Hang động thạch nhũ đặc sắc cách thác khoảng 3 km, nếu thời gian cho phép.",
      ],
    ],
  },
  {
    title: "Cánh đồng Ngọc Côn và thác Bản Giốc",
    narrative: [
      "Chụp phong cảnh đa góc và trải nghiệm thiên nhiên sâu hơn",
      "Một ngày trọn vẹn dành cho khu vực Bản Giốc, tối đa hóa thời gian tại một trong những điểm chụp quan trọng nhất của hành trình.",
      "Ghi chú: Việc kết hợp cánh đồng Ngọc Côn và Bản Giốc trong cùng một ngày mang lại hai chủ thể hoàn toàn khác nhau trong bán kính di chuyển ngắn.",
    ],
    activities: [
      [
        "Chụp ảnh buổi sáng tại cánh đồng Ngọc Côn",
        "Những thửa ruộng xanh và vàng óng trong mùa thu.",
      ],
      [
        "Buổi trưa đến chiều chụp mở rộng tại thác Bản Giốc",
        "Từ 10:00 sáng đến 3:00 chiều, khai thác nhiều góc chụp, điều kiện ánh sáng và màn sương từ dòng sông.",
      ],
      ["Thời gian còn lại nghỉ ngơi hoặc đi bộ nhẹ quanh thung lũng"],
    ],
  },
  {
    title: "Cao Bằng đến Bình Liêu",
    narrative: [
      "Hành trình vùng biên và mở đầu văn hóa người Dao",
      "Sau ngày bổ sung tại Cao Bằng, đoàn bắt đầu di chuyển về phía Tây, hướng tới tỉnh Quảng Ninh.",
      "Ghi chú: Song Mooc House có kinh nghiệm điều phối các buổi chụp chân dung với phụ nữ Dao địa phương, hỗ trợ sắp xếp lịch và kết nối cộng đồng.",
    ],
    activities: [
      ["Tùy chọn chụp buổi bình minh cuối tại Bản Giốc hoặc Ba Quang"],
      [
        "Di chuyển thẳng tới Bình Liêu, tỉnh Quảng Ninh",
        "Khoảng 5 đến 6 giờ.",
      ],
      ["Đến Bình Liêu và nhận phòng tại Song Mooc House"],
      ["Khảo sát buổi tối quanh khu vực làng người Dao Thanh Phán"],
    ],
  },
  {
    title: "Chụp chân dung Dao Thanh Phán tại Bình Liêu",
    narrative: [
      "Chân dung dân tộc và nhịp sống vùng cao",
      "Bình Liêu là nơi sinh sống của một trong những nhóm dân tộc có tạo hình thị giác đặc sắc nhất Việt Nam: người Dao Thanh Phán, với phụ nữ đội khăn đỏ dạng hộp nổi bật.",
      "Ghi chú: Song Mooc House điều phối các buổi chụp với sự đồng thuận của cộng đồng. Nhiếp ảnh gia cần tuân theo hướng dẫn về ranh giới chụp ảnh và cách tương tác tôn trọng.",
    ],
    activities: [
      [
        "Buổi sáng chụp chân dung phụ nữ Dao Thanh Phán trong trang phục truyền thống",
      ],
      [
        "Khăn đội đầu đỏ dạng góc cạnh",
        "Kiểu khăn này là nét riêng của nhóm Dao Thanh Phán và hiếm khi được ghi lại bên ngoài khu vực.",
      ],
      [
        "Buổi chiều chụp đời sống bản làng",
        "Sinh hoạt thường ngày, nghề dệt và trẻ em trong bản.",
      ],
      ["Tùy chọn đi bộ tới các điểm ngắm cảnh gần đó trên vùng cao Bình Liêu"],
    ],
  },
  {
    title: "Bình Liêu về Hà Nội hoặc Long Cốc",
    narrative: [
      "Lộ trình linh hoạt và các lựa chọn tùy chỉnh",
      "Đoàn bắt đầu hành trình quay về phía Nam với hai phương án tuyến đường tùy theo mối quan tâm của nhóm.",
      "Ghi chú: Phương án B bổ sung thêm chất liệu hình ảnh và tránh việc đến Mù Cang Chải quá muộn. Nếu lịch trình cho phép, Long Cốc là một điểm rẽ rất đáng giá.",
    ],
    activities: [
      [
        "Phương án A: Tuyến tiêu chuẩn",
        "Di chuyển từ Bình Liêu về Hà Nội, khoảng 4 đến 5 giờ, nghỉ ngơi buổi chiều tại Hà Nội.",
      ],
      [
        "Phương án B: Tuyến khuyến nghị",
        "Di chuyển tới đồi chè Long Cốc, Phú Thọ, với các đồi chè xanh uốn lượn, góc drone đẹp và chất liệu phong cảnh phong phú.",
      ],
      ["Nghỉ đêm tại nhà nghỉ địa phương nếu chọn Long Cốc"],
      [
        "Sáng hôm sau tiếp tục đi Mù Cang Chải để có nhiều thời gian chụp hơn khi đến nơi",
      ],
    ],
  },
  {
    title: "Hà Nội đến Mù Cang Chải",
    narrative: [
      "Cung đường núi Tây Bắc và toàn cảnh vùng cao",
      "Một cung đường núi biểu tượng qua hành lang Tây Bắc, dẫn tới một trong những vùng ruộng bậc thang nổi tiếng nhất Việt Nam.",
    ],
    activities: [
      [
        "Rời Hà Nội từ sáng sớm",
        "Tổng thời gian di chuyển khoảng 5 đến 6 giờ.",
      ],
      [
        "Dừng chụp ảnh tại thung lũng Tú Lệ",
        "Thung lũng ruộng bậc thang dạng lòng chảo và bản người Kháng.",
      ],
      [
        "Chụp ảnh tại đèo Khau Phạ",
        "Một trong tứ đại đỉnh đèo của Việt Nam, với tầm nhìn toàn cảnh vùng cao.",
      ],
      ["Đến Mù Cang Chải và nhận phòng"],
    ],
  },
  {
    title: "Ngày chụp tự do tại Mù Cang Chải",
    narrative: [
      "Một ngày chụp linh hoạt và hòa mình vào văn hóa địa phương",
      "Một ngày trọn vẹn không bó cứng lịch trình để khám phá Mù Cang Chải theo nhịp riêng. Hướng dẫn viên sẽ gợi ý địa điểm dựa trên ánh sáng trong ngày và hoạt động mùa gặt.",
      "Ghi chú: Mùa thu, từ tháng 9 đến tháng 10, là mùa gặt cao điểm tại Mù Cang Chải. Ruộng bậc thang chuyển vàng hổ phách và nông dân hoạt động trên đồng từ bình minh đến hoàng hôn.",
      "Ánh sáng trên ruộng bậc thang Mù Cang Chải thay đổi mạnh trong ngày. Nên giữ lịch trình linh hoạt và bám theo giờ vàng.",
    ],
    activities: [
      [
        "Chụp bình minh tại ruộng bậc thang La Pán Tẩn hoặc Zế Xu Phình",
        "Những địa điểm được chụp nhiều nhất trong khu vực.",
      ],
      [
        "Giữa buổi sáng tại xã Dế Xu Phình",
        "Ruộng bậc thang ở nhiều cao độ, rất phù hợp cho bố cục đường dẫn.",
      ],
      ["Buổi chiều thăm chợ bản hoặc làng người Mông"],
      ["Chụp hoàng hôn từ một điểm cao trên sườn núi"],
    ],
  },
  {
    title: "Mù Cang Chải đến Hà Nội, Đà Nẵng và Hội An",
    narrative: [
      "Kết nối miền núi phía Bắc với di sản ven biển miền Trung",
      "Một ngày di chuyển nối vùng núi phía Bắc với dải ven biển lịch sử của miền Trung Việt Nam.",
    ],
    activities: [
      ["Chụp bình minh cuối cùng tại Mù Cang Chải"],
      ["Di chuyển về Hà Nội", "Khoảng 5 đến 6 giờ."],
      ["Bay từ Hà Nội (HAN) đến Đà Nẵng (DAD)"],
      ["Di chuyển từ sân bay Đà Nẵng về Hội An", "Khoảng 45 phút."],
      ["Nhận phòng và nghỉ ngơi buổi tối"],
      ["Tùy chọn dạo phố cổ Hội An dưới ánh đèn lồng"],
    ],
  },
  {
    title: "Sông nước và làng nghề Hội An",
    narrative: [
      "Truyền thống thủ công sống động và nhiếp ảnh sông nước",
      "Một buổi sáng trên mặt nước và một buổi chiều giữa những tấm lưới, kết hợp hai truyền thống nghề thủ công đang hiện hữu trong đời sống thường ngày.",
      "Ghi chú: Nghề đan lưới ở Trà Nhiêu là sinh kế thật hằng ngày, không phải màn trình diễn dàn dựng. Buổi chụp quăng chài có thể được sắp xếp thông qua đối tác tại Hội An.",
      "Nghệ nhân thuyền thúng Kim Bồng: Có thể sắp xếp một buổi chụp chân dung độc quyền với nghệ nhân lớn tuổi đan thuyền thúng tre. Trọng tâm là cận cảnh đôi tay phong sương và các họa tiết tre chẻ hình học dưới ánh sáng mềm trong xưởng.",
      "Nhiếp ảnh đóng tàu truyền thống: Các xưởng đóng tàu gỗ đang hoạt động trong làng mang đến chủ đề di sản công nghiệp giàu kịch tính, với khung tàu, chất liệu gỗ thô, tia lửa và dụng cụ tạo hình.",
    ],
    activities: [
      [
        "Sáng sớm di chuyển tới làng Cẩm Thanh",
        "Chụp thuyền thúng truyền thống giữa rừng dừa nước. Rừng dừa ngập nước tạo phản chiếu rất đẹp trong ánh sáng mềm buổi sáng, lý tưởng từ 6:00 đến 8:30.",
      ],
      [
        "Khu mộc Kim Bồng và nghề đan lưới",
        "Chụp các nghệ nhân địa phương đang làm việc tại làng nghề di sản.",
      ],
      [
        "Buổi chiều di chuyển tới làng Trà Nhiêu",
        "Chụp phụ nữ đan lưới đánh cá màu xanh dọc vùng cửa sông Thu Bồn.",
      ],
      [
        "Tùy chọn chụp chân dung hành động với quăng chài",
        "Có thể thuê buổi quăng chài để tạo các khung hình chuyển động mạnh.",
      ],
    ],
  },
  {
    title: "Chân dung ven biển Hội An và chợ cá Tam Tiến",
    narrative: [
      "Chân dung trước bình minh và chợ cá Tam Tiến",
      "Một ngày chụp giàu tác động thị giác, kết hợp chân dung ngư dân trước bình minh, phố cổ yên tĩnh trong ánh sáng đầu ngày và chợ cá đang hoạt động.",
      "Ghi chú: Từ tháng 9 trở đi, mùa bão có thể làm giảm hoạt động đánh bắt, khiến chợ Tam Tiến vắng hơn trong các giai đoạn thời tiết xấu. Nên xác nhận với đầu mối địa phương trước 1 đến 2 ngày.",
    ],
    activities: [
      [
        "Chụp chân dung trước bình minh với ngư dân Đỗ Văn Mười",
        "Quăng lưới trong ánh sáng sớm.",
      ],
      [
        "Phố cổ Hội An trong ánh sáng đầu ngày",
        "Đèn lồng, những mảng tường vàng và các con hẻm vắng trước khi du khách xuất hiện.",
      ],
      [
        "Chợ cá Tam Tiến buổi sáng",
        "Một chợ đấu giá cá đang hoạt động ở phía Nam Hội An.",
      ],
    ],
  },
  {
    title: "Các buổi chụp chân dung tại Hội An",
    narrative: [
      "Chân dung bà Bùi Thị Xong và linh hồn phố cổ",
      "Một ngày yên tĩnh và gần gũi hơn, dành cho một trong những nhân vật chân dung được yêu thích nhất tại Hội An.",
    ],
    activities: [
      [
        "Buổi sáng chụp chân dung bà Bùi Thị Xong",
        "Một phụ nữ lớn tuổi địa phương, gương mặt và đời sống thường ngày của bà đã trở thành chủ đề được nhiều nhiếp ảnh gia yêu thích.",
      ],
      [
        "Buổi chiều tự do",
        "Khám phá phố cổ Hội An, đi cà phê, nghỉ ngơi hoặc mua sắm phút cuối.",
      ],
    ],
  },
  {
    title: "Hội An đến Đà Nẵng, Hà Nội và khởi hành",
    narrative: [
      "Buổi sáng thong thả trong phố cổ và tạm biệt Việt Nam",
      "Một buổi sáng cuối cùng nhẹ nhàng trước hành trình trở về.",
    ],
    activities: [
      [
        "Buổi sáng tự do tại Hội An",
        "Ăn sáng thong thả, dạo lần cuối trong phố cổ, mua sắm hoặc nghỉ ngơi.",
      ],
      ["Buổi trưa hoặc chiều di chuyển ra sân bay quốc tế Đà Nẵng"],
      [
        "Chuyến bay tối từ Đà Nẵng (DAD)",
        "Nối chuyến qua các điểm trung chuyển tới điểm đến quốc tế, bao gồm các tuyến tới Nga.",
      ],
    ],
  },
];

const enDayContent = [
  {
    title: "Hanoi Arrival",
    narrative: [
      "Immersive Introduction to Vietnam's Historic Capital",
      "Welcome to Vietnam. Your guide and driver will meet you at Noi Bai International Airport and transfer you to your hotel in the Old Quarter or West Lake area.",
      "Note: Hanoi is your base for the night before heading north into the limestone highlands.",
    ],
    activities: [
      ["Private airport pickup and hotel transfer"],
      ["Hotel check-in and rest"],
      ["Optional evening stroll around Hoan Kiem Lake for warm-up street photography"],
    ],
  },
  {
    title: "Hanoi to Bac Son and Quynh Son Village",
    narrative: [
      "Dramatic Karst Valleys and Ethnic Cultural Exchange",
      "We depart Hanoi early and drive north to Lang Son Province, entering one of Vietnam's most dramatic valley landscapes.",
      "Note: Na Lay Peak is most dramatic at sunrise or late afternoon. Midday light is harsh and flat, so the shooting window is scheduled accordingly.",
    ],
    activities: [
      ["Morning drive from Hanoi to Bac Son", "Approximately 3 hours."],
      ["Photography session at Huu Lien grassland meadows", "Golden morning light on the karst valley floor."],
      ["Afternoon at Na Lay Peak", "Bac Son Viewpoint with panoramic views over the Bac Son rice plain."],
      ["Drone photography permitted"],
      ["Evening cultural exchange at Quynh Son Tay ethnic village", "Hat then folk singing performance."],
      ["Overnight in Quynh Son village homestay or Bac Son town"],
    ],
  },
  {
    title: "Bac Son to Cao Bang via Ha Lang",
    narrative: [
      "Highland Road Trip and Rolling Hills Photography",
      "A long but rewarding transfer day through the northeastern highlands, with shooting opportunities along the way.",
      "Note: Ba Quang Mound offers excellent mid-afternoon sidelight for landscape portraits and wide-angle compositions.",
    ],
    activities: [
      ["Early morning final photography of Bac Son valley and rice fields", "Golden-hour light over the valley and rice fields."],
      ["Depart Bac Son at around 9:00 AM"],
      ["Drive to Ha Lang district, Cao Bang", "Approximately 3 to 4 hours."],
      ["Afternoon photography session at Ba Quang Mound", "Ba Quang hillock, rolling hills, and ethnic village scenery."],
      ["Late afternoon transfer to Phong Nam Valley", "Check in and settle."],
    ],
  },
  {
    title: "Phong Nam to God's Eye Mountain and Ban Gioc",
    narrative: [
      "Misty Valley Peaks and Majestic Geological Wonders",
      "One of the most visually stunning days of the tour, moving from misty mountain valleys to one of Southeast Asia's most spectacular waterfalls.",
      "Note: Ban Gioc is best photographed from mid-morning to mid-afternoon when light hits the cascade directly. The specialist partner manages the drone permit and operation on-site.",
      "Drone Permit: Exclusive drone permit at Ban Gioc Waterfalls in the Vietnam-China border zone. Only one photographer in Vietnam currently holds authorization for aerial filming here.",
    ],
    activities: [
      ["Early morning photography at Phong Nam Valley", "Mist rising over rice terraces and limestone peaks."],
      ["Mid-morning transfer to God's Eye Mountain", "Nui Mat Than, a geological wonder with striking circular rock formations."],
      ["Afternoon arrival at Ban Gioc Waterfalls", "The largest waterfall on the Vietnam-China border and one of the most majestic in Asia."],
      ["Drone shooting at Ban Gioc", "With an exclusive local photographer partner, currently the only operator in Vietnam authorized to fly here."],
      ["Optional visit to Nguom Ngao Cave", "An extraordinary stalactite cavern 3 km from the falls, if time permits."],
    ],
  },
  {
    title: "Ngoc Con Fields and Ban Gioc Waterfalls",
    narrative: [
      "Multi-Angle Landscape Session and Immersive Nature Walks",
      "A full day dedicated to the Ban Gioc area, maximizing your time at this legendary shooting location.",
      "Note: The combination of Ngoc Con fields and Ban Gioc on the same day gives you two completely different subjects within a short driving radius.",
    ],
    activities: [
      ["Morning photography of Ngoc Con rice fields", "Lush paddy terraces that glow in autumn gold."],
      ["Midday-afternoon extended shoot at Ban Gioc Waterfalls", "From 10:00 AM to 3:00 PM, capturing various angles, light conditions, and the river mist."],
      ["Rest of day at leisure or short nature walk around the valley"],
    ],
  },
  {
    title: "Cao Bang to Binh Lieu",
    narrative: [
      "Highland Border Journey and Dao Ethnic Culture Preview",
      "With the extra Cao Bang day completed, the transfer begins west toward Quang Ninh Province.",
      "Note: Song Mooc House has experience coordinating portrait sessions with local Dao women and assists with scheduling and community introductions.",
    ],
    activities: [
      ["Early morning optional final shoot at Ban Gioc or Ba Quang at sunrise"],
      ["Direct transfer to Binh Lieu, Quang Ninh Province", "Approximately 5 to 6 hours."],
      ["Arrive Binh Lieu and check in at Song Mooc House"],
      ["Evening scout of Dao Thanh Phan village surroundings"],
    ],
  },
  {
    title: "Binh Lieu Dao Thanh Phan Portrait Session",
    narrative: [
      "Ethnic Portraiture and Highland Daily Routines",
      "Binh Lieu is home to one of Vietnam's most visually distinctive ethnic groups, the Dao Thanh Phan, whose women wear striking red box-shaped headdresses.",
      "Note: Song Mooc House coordinates these sessions with community consent. Photographers should follow guide instructions regarding photography boundaries and respectful engagement.",
    ],
    activities: [
      ["Morning portrait photography session with Dao Thanh Phan women in traditional attire"],
      ["The red angular headdress", "This headwear is unique to the sub-group and rarely documented outside the region."],
      ["Afternoon village life photography", "Daily routines, textile work, and children."],
      ["Optional walk to nearby viewpoints over the Binh Lieu highlands"],
    ],
  },
  {
    title: "Binh Lieu to Hanoi or Long Coc",
    narrative: [
      "Flexible Return Route and Custom Routing Options",
      "The journey begins back south with two routing options depending on the group's interests.",
      "Note: Option B adds visual variety and avoids arriving at Mu Cang Chai late. If the schedule allows, Long Coc is a rewarding detour.",
    ],
    activities: [
      ["Option A: Standard route", "Transfer from Binh Lieu to Hanoi, approximately 4 to 5 hours, with a rest afternoon in Hanoi."],
      ["Option B: Recommended route", "Transfer to Long Coc tea hill in Phu Tho for rolling green hills, excellent drone angles, and landscape photography."],
      ["Overnight at a local guesthouse if choosing Long Coc"],
      ["Continue to Mu Cang Chai the next morning with more daylight upon arrival"],
    ],
  },
  {
    title: "Hanoi to Mu Cang Chai",
    narrative: [
      "Epic Northwest Mountain Drive and Panoramic Highland Views",
      "An iconic mountain drive through the northwest corridor to one of Vietnam's most celebrated rice terrace landscapes.",
    ],
    activities: [
      ["Depart Hanoi early morning", "Approximately 5 to 6 hours total drive time."],
      ["Photography stop at Tu Le Valley", "Wide bowl-shaped terraces and a Khang minority village."],
      ["Photography at Khau Pha Pass", "One of Vietnam's four great mountain passes, with panoramic highland views."],
      ["Arrive Mu Cang Chai and check in"],
    ],
  },
  {
    title: "Mu Cang Chai Free Shooting Day",
    narrative: [
      "Full-Day Unstructured Photography and Immersive Culture",
      "A full, unstructured day to explore Mu Cang Chai at your own pace. The guide suggests locations based on the day's light and harvest activity.",
      "Note: Autumn, from September to October, is peak harvest season at Mu Cang Chai. The terraces turn gold and amber, and local farmers are active in the fields from dawn to dusk.",
      "Mu Cang Chai's terrace light changes dramatically throughout the day. Staying flexible and following the golden hour is recommended.",
    ],
    activities: [
      ["Sunrise shoot at La Pan Tan or Ze Xu Phinh terraces", "The most photographed locations in the district."],
      ["Mid-morning in De Xu Phinh commune", "Terraces at multiple elevations, excellent for leading-line compositions."],
      ["Afternoon village market or Mong minority village visit"],
      ["Sunset from a high ridge point"],
    ],
  },
  {
    title: "Mu Cang Chai to Hanoi, Da Nang, and Hoi An",
    narrative: [
      "Connecting Mountains to Heritage Coastlines",
      "A travel day connecting the mountainous north to the historic coastline of Central Vietnam.",
    ],
    activities: [
      ["Early morning final sunrise shoot at Mu Cang Chai"],
      ["Transfer to Hanoi", "Approximately 5 to 6 hours."],
      ["Fly from Hanoi (HAN) to Da Nang (DAD)"],
      ["Transfer from Da Nang airport to Hoi An", "Approximately 45 minutes."],
      ["Check in and evening rest"],
      ["Optional evening stroll to the Ancient Town lantern-lit streets"],
    ],
  },
  {
    title: "Hoi An Waterway and Craft Villages",
    narrative: [
      "Living Craft Traditions and Waterway Photography",
      "A morning on the water and an afternoon among the nets, bringing together two living craft traditions in one day.",
      "Note: Tra Nhieu fishing net weaving is an active daily livelihood, not a staged demonstration. A cast net session can be arranged through the Hoi An partner.",
      "Kim Bong Basket Boat Artisan: An exclusive portrait session can be arranged with a master elderly artisan weaving bamboo basket boats. The focus is on close-up shots of weathered hands and intricate geometric split-bamboo patterns under soft workshop light.",
      "Traditional Shipbuilding Photography: The village's active wooden shipbuilding yards offer a dramatic industrial-heritage concept, with vessel skeletons, raw timber textures, sparks, and shaping tools.",
    ],
    activities: [
      ["Early morning transfer to Cam Thanh village", "Photography of traditional round basket boats among nipa palm waterways. The flooded palm forest creates magical reflections in soft morning light, best from 6:00 to 8:30 AM."],
      ["Kim Bong carpentry and net-weaving quarter", "Photography of local artisans at work in this heritage craft village."],
      ["Afternoon transfer to Tra Nhieu village", "Photography of women weaving blue fishing nets along the Thu Bon River estuary."],
      ["Optional cast net action portrait session", "A cast net can be hired for dynamic action shots."],
    ],
  },
  {
    title: "Hoi An Coastal Portraits and Tam Tien Fish Market",
    narrative: [
      "Pre-Dawn Coastal Portraits and Tam Tien Fish Market",
      "A high-impact photography day combining pre-dawn fishing portraiture, the quiet Ancient Town at first light, and a working fish market.",
      "Note: From September onward, typhoon season reduces fishing activity and Tam Tien Market may be less busy during storm periods. The visit is best confirmed with local contacts 1 to 2 days before arrival.",
    ],
    activities: [
      ["Pre-dawn portrait session with fisherman Do Van Muoi", "Casting nets in the early morning light."],
      ["Hoi An Ancient Town at first light", "Lanterns, yellow facades, and empty alleyways before the tourist crowds arrive."],
      ["Morning Tam Tien fish market", "A working fish auction market south of Hoi An town."],
    ],
  },
  {
    title: "Hoi An Portrait Sessions",
    narrative: [
      "Intimate Portrait Sessions of Bui Thi Xong and the Soul of the Ancient Town",
      "A quieter, more intimate day dedicated to one of Hoi An's most beloved portrait subjects.",
    ],
    activities: [
      ["Morning portrait session with Bui Thi Xong", "An elderly local woman whose face and daily life have become beloved subjects among visiting photographers."],
      ["Afternoon free time", "Explore Hoi An Ancient Town, cafe, rest, or last-minute shopping."],
    ],
  },
  {
    title: "Hoi An to Da Nang, Hanoi, and Departure",
    narrative: [
      "Leisurely Morning in the Ancient Town and Farewell Vietnam",
      "A leisurely final morning before the journey home.",
    ],
    activities: [
      ["Morning free time in Hoi An", "Leisurely breakfast, final stroll through the Ancient Town, shopping, or rest at leisure."],
      ["Midday or afternoon transfer to Da Nang International Airport"],
      ["Evening flight from Da Nang (DAD)", "Connecting via transit hubs to international destinations, including routes to Russia."],
    ],
  },
];

const tourCopy = {
  vi: {
    title: "Tour Nhiếp Ảnh Mùa Thu Việt Nam - Hành trình 15 ngày",
    description: [
      "Băng qua những cảnh quan mùa thu ấn tượng nhất miền Bắc Việt Nam, từ Hà Nội, Bắc Sơn đến Cao Bằng, Bình Liêu, Mù Cang Chải, Đà Nẵng và Hội An.",
      "Hành trình nhiếp ảnh 15 ngày này ghi lại ruộng bậc thang vàng óng, sương sớm, văn hóa dân tộc rực rỡ, thác nước, làng nghề truyền thống, di sản Hội An và các góc nhìn drone hiếm có.",
      "Tour kết hợp giấy phép drone độc quyền, các cuộc gặp gỡ chân thực với cộng đồng dân tộc thiểu số và ánh sáng mùa thu đẹp nhất, được Vietway Travel thiết kế như một hành trình nhiếp ảnh chuyên sâu.",
    ],
    excerpt:
      "Hành trình nhiếp ảnh 15 ngày qua cảnh quan mùa thu Việt Nam, ruộng bậc thang, thác nước, điểm chụp chân dung dân tộc, khu vực có giấy phép drone và các làng di sản Hội An.",
    budgetNotes:
      "Báo giá tùy chỉnh theo số lượng khách, mùa khởi hành, khách sạn, chuyến bay, yêu cầu giấy phép drone và mức hỗ trợ nhiếp ảnh chuyên sâu.",
    packingList: [
      { item: "Máy ảnh chính và thân máy dự phòng", category: "gear" },
      { item: "Ống kính góc rộng, chân dung và tele", category: "gear" },
      { item: "Tripod và thiết bị drone ở nơi được phép", category: "gear" },
      { item: "Kính lọc ND và thẻ nhớ dự phòng", category: "electronics" },
      { item: "Giày đi bộ thoải mái và áo mưa nhẹ", category: "clothing" },
      { item: "Hộ chiếu, bảo hiểm du lịch và giấy tờ cấp phép liên quan", category: "documents" },
    ],
    tips: [
      "Giấy phép drone độc quyền được sắp xếp cho Bắc Sơn, thung lũng Phong Nặm và thác Bản Giốc.",
      "Thời điểm mùa thu được lựa chọn để bám theo đồng lúa vàng, sương sớm và mùa nước đẹp tại các thác ở miền Bắc Việt Nam.",
      "Các buổi chụp với cộng đồng địa phương được điều phối trên cơ sở đồng thuận và cần tuân theo hướng dẫn để tương tác tôn trọng.",
    ],
    metaTitle: "Tour Nhiếp Ảnh Mùa Thu Việt Nam | Hành trình 15 ngày",
    metaDescription:
      "Tour nhiếp ảnh Việt Nam 15 ngày qua Bắc Sơn, Cao Bằng, Bản Giốc, Bình Liêu, Mù Cang Chải, Đà Nẵng và Hội An, với cảnh quan mùa thu, chân dung dân tộc và đặc quyền drone.",
    metaKeywords:
      "tour nhiếp ảnh Việt Nam, tour mùa thu Việt Nam, giấy phép drone Bản Giốc, nhiếp ảnh Mù Cang Chải, chụp chân dung Hội An, nhiếp ảnh Bắc Sơn",
  },
  en: {
    title: "Vietnam Autumn Photography Tour - 15-Day Custom Photo Expedition",
    description: [
      "Traverse North Vietnam's most breathtaking autumn landscapes, from Hanoi and Bac Son to Cao Bang, Binh Lieu, Mu Cang Chai, Da Nang, and Hoi An.",
      "This 15-day custom photography expedition captures golden rice terraces, morning mist, vibrant ethnic cultures, waterfalls, traditional craft villages, Hoi An heritage scenes, and rare drone perspectives.",
      "The tour combines exclusive drone permits, authentic ethnic minority encounters, and peak autumn light, crafted by Vietway Travel as a specialist photography expedition.",
    ],
    excerpt:
      "A 15-day custom photo expedition through Vietnam's autumn landscapes, rice terraces, waterfalls, ethnic portrait locations, drone-permit zones, and Hoi An heritage villages.",
    budgetNotes:
      "Custom quotation based on group size, season, hotels, flights, drone permit requirements, and specialist photography support.",
    packingList: [
      { item: "Camera body and backup body", category: "gear" },
      { item: "Wide-angle, portrait, and telephoto lenses", category: "gear" },
      { item: "Tripod and drone equipment where permitted", category: "gear" },
      { item: "Neutral density filters and extra memory cards", category: "electronics" },
      { item: "Comfortable walking shoes and light rain layer", category: "clothing" },
      { item: "Passport, travel insurance, and permit documentation", category: "documents" },
    ],
    tips: [
      "Exclusive drone permits are arranged for Bac Son, Phong Nam Valley, and Ban Gioc Waterfalls.",
      "Autumn timing is designed around golden harvest fields, morning mist, and peak waterfall volume across North Vietnam.",
      "Photography sessions with local communities are coordinated with consent and should follow guide instructions for respectful engagement.",
    ],
    metaTitle: "Vietnam Autumn Photography Tour | 15-Day Custom Photo Expedition",
    metaDescription:
      "A 15-day Vietnam photography tour through Bac Son, Cao Bang, Ban Gioc, Binh Lieu, Mu Cang Chai, Da Nang, and Hoi An, with autumn landscapes, ethnic portraits, and drone privileges.",
    metaKeywords:
      "Vietnam photography tour, Vietnam autumn tour, Ban Gioc drone permit, Mu Cang Chai photography, Hoi An portrait photography, Bac Son photography",
  },
};

function getTourLocale(locale?: string) {
  return locale === "vi" ? "vi" : "en";
}


export function createVietnamAutumnPhotographyTour(
  countries: MockRecord[],
  cities: MockRecord[],
  locale?: string,
) {
  const tourLocale = getTourLocale(locale);
  const copy = tourCopy[tourLocale];
  const days = tourLocale === "vi" ? viDayContent : enDayContent;
  const title = copy.title;
  const country =
    countries.find((item) => item.slug === "vietnam") || countries[0];
  const selectedCities = findBySlugOrName(cities, [
    "hanoi",
    "cao-bang",
    "mu-cang-chai",
    "da-nang",
    "hoi-an",
  ]);

  return {
    id: "mock-itinerary-vietnam-autumn-photo-expedition-15-days",
    title,
    slug: TOUR_SLUG,
    description: richText(...copy.description),
    excerpt: copy.excerpt,
    featuredImage: placeholderImage(title),
    duration: 15,
    countries: country ? [country] : [],
    cities: selectedCities.length > 0 ? selectedCities : cities.slice(0, 5),
    difficulty: "moderate",
    travelStyle: ["adventure", "cultural", "luxury"],
    estimatedBudget: {
      currency: "USD",
      notes: copy.budgetNotes,
    },
    days: days.map((day, index) => ({
      dayNumber: index + 1,
      title: day.title,
      city: (selectedCities.length > 0 ? selectedCities : cities)[
        Math.min(
          index < 11 ? 0 : 4,
          Math.max((selectedCities.length || cities.length) - 1, 0),
        )
      ],
      description: richText(...day.narrative),
      activities: day.activities.map(([activity, description]) => ({
        activity,
        ...(description ? { description } : {}),
      })),
    })),
    packingList: copy.packingList,
    tips: richText(...copy.tips),
    metaTitle: copy.metaTitle,
    metaDescription: copy.metaDescription,
    metaKeywords: copy.metaKeywords,
    status: "published",
    publishedAt: NOW,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

export const vietnamAutumnPhotographyTourSlug = TOUR_SLUG;
