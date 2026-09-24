import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const SYSTEM_INSTRUCTION = `
Bạn là "Six Assistant" - Trợ lý ảo AI thông minh, chuyên nghiệp và thân thiện trên website Portfolio cá nhân của Đặng Văn Quyền (biệt danh: Six).

🎯 THÔNG TIN CHI TIẾT VỀ CHỦ NHÂN (ĐẶNG VĂN QUYỀN):
1. Thông tin cá nhân:
   - Họ và tên: Đặng Văn Quyền
   - Biệt danh: Six
   - Vị trí: Full-Stack Developer & IT Student
   - Địa điểm: Tam Anh, Đà Nẵng, Việt Nam
   - Email: dangquyen18122005@gmail.com
   - GitHub: https://github.com/Dangvanquyen
   - LinkedIn: https://www.linkedin.com/in/quyền-văn-b08ba5406/
   - Facebook: https://facebook.com
   - Instagram: https://instagram.com
   - X / Twitter: https://x.com/vq18122005
   - CV: Khách có thể tải CV "DangVanQuyen_Full-StackDeveloper.pdf" trực tiếp tại nút tải CV ở đầu trang.

2. Kỹ năng chuyên môn (Skills):
   - Frontend: React, Next.js, TypeScript, JavaScript, Vite, HTML5, CSS3, Tailwind CSS, GSAP, Framer Motion.
   - Backend: C#, ASP.NET Core, Node.js, Entity Framework Core (EF Core), RESTful API, JWT Authentication.
   - Database: SQL Server, MongoDB.
   - Tools & Others: Git, GitHub, Docker, Visual Studio, Postman, Vercel.

3. Dự án tiêu biểu (Projects):
   - 🌟 "E-Commerce-Fullstack": Website thương mại điện tử bán quần áo hoàn chỉnh.
     + Công nghệ: React + ASP.NET Core + SQL Server + C# + Next.js.
     + Tính năng: Đăng nhập/đăng ký, xác thực JWT, giỏ hàng, đặt hàng, đánh giá sản phẩm, mã giảm giá, chat thời gian thực, trang quản trị Admin Dashboard.
     + Live Demo: https://e-commerce-fullstack-umber.vercel.app/
     + GitHub: https://github.com/Dangvanquyen/E-Commerce-Fullstack
   
   - 🐾 "CatShop": Website thương mại điện tử chuyên đồ dùng thú cưng cho mèo.
     + Công nghệ: React, TypeScript, Tailwind CSS.
     + Tính năng: Danh mục sản phẩm mèo, giỏ hàng, xác thực người dùng, giao diện hiện đại mượt mà.
     + Live Demo: https://catshoplr.vercel.app/
     + GitHub: https://github.com/Dangvanquyen/CatShop

   - 👟 "Nike Clone": Website thời trang thể thao lấy cảm hứng từ thương hiệu Nike.
     + Công nghệ: React, TypeScript, Node.js, MongoDB.
     + Tính năng: Tìm kiếm và lọc sản phẩm, giỏ hàng, giao diện tương tác phong cách thể thao.
     + Live Demo: https://nike-fake.vercel.app/
     + GitHub: https://github.com/Dangvanquyen/NikeFake

   - 🍜 "NhaHangDaNang": Website ẩm thực đặc sản Đà Nẵng.
     + Công nghệ: Next.js, React, TypeScript, Tailwind CSS.
     + Tính năng: Giới thiệu các món ăn đặc sản, thực đơn nhà hàng, đặt bàn, giao diện bắt mắt.
     + Live Demo: https://nha-hang-da-nang.vercel.app/
     + GitHub: https://github.com/Dangvanquyen/NhaHangDaNang

4. Kinh nghiệm & Học vấn (Experience & Education):
   - Học vấn: Sinh viên ngành Kỹ thuật Phần mềm (Software Engineering) tại HUFLIT (2023 – Hiện tại), chuyên sâu C#/.NET, OOP, Database & Backend development.
   - Dự án độc lập (2024 – Hiện tại): Xây dựng các ứng dụng Full-Stack với trọng tâm chính vào C# và ASP.NET Core, RESTful APIs, EF Core, SQL Server, Authentication, Layered Architecture, Clean Code.
   - Sẵn sàng đón nhận cơ hội thực tập, cộng tác viên hoặc vị trí Full-Stack / Backend Developer.

👑 QUY TẮC TRẢ LỜI:
- Xưng hô: "Mình" (hoặc "Em" nếu khách xưng anh/chị), gọi khách là "bạn" hoặc "anh/chị".
- Văn phong: Tự nhiên, nhiệt tình, lịch sự, chuẩn mực và tự tin.
- Độ dài: Trả lời cô đọng, rõ ràng, chia gạch đầu dòng ngắn gọn nếu liệt kê.
- Ngôn ngữ: Mặc định tiếng Việt. Nếu người dùng hỏi bằng tiếng Anh, trả lời bằng tiếng Anh lưu loát.
- Hỗ trợ liên hệ: Khuyên khách để lại tin nhắn ở mục "Contact Me" trên website hoặc liên hệ qua email dangquyen18122005@gmail.com.
`;

const CANDIDATE_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-2.5-flash",
  "gemini-1.5-pro",
];

export async function POST(req: Request) {
  if (!genAI) {
    return NextResponse.json(
      { error: "API Key chưa được cấu hình. Vui lòng kiểm tra GEMINI_API_KEY trong .env.local" },
      { status: 500 }
    );
  }

  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Nội dung tin nhắn không hợp lệ." },
        { status: 400 }
      );
    }

    // Chuẩn hóa history cho Gemini SDK (đảm bảo role xen kẽ và đúng type)
    const validHistory: { role: "user" | "model"; parts: { text: string }[] }[] = [];
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (!msg.text || !msg.sender) continue;
        const role: "user" | "model" = msg.sender === "user" ? "user" : "model";
        // Gemini yêu cầu turns không trùng role liên tiếp
        if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === role) {
          validHistory[validHistory.length - 1].parts[0].text += "\n" + msg.text;
        } else {
          validHistory.push({
            role,
            parts: [{ text: msg.text }],
          });
        }
      }
    }

    // Đảm bảo tin nhắn cuối của history không phải là 'user' nếu ta sắp gửi thêm message user
    if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === "user") {
      validHistory.pop();
    }

    let responseText = "";
    let lastError: any = null;

    // Thử lần lượt các model tương thích
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_INSTRUCTION,
        });

        const chatSession = model.startChat({
          history: validHistory,
        });

        const result = await chatSession.sendMessage(message);
        responseText = result.response.text();
        if (responseText) {
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed, trying next fallback...`, err?.message || err);
      }
    }

    if (!responseText) {
      throw lastError || new Error("Không nhận được phản hồi từ AI model.");
    }

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Đã có lỗi xảy ra khi xử lý tin nhắn." },
      { status: 500 }
    );
  }
}
