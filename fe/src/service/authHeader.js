export default function authHeader() {
    //  lấy thông tin người dùng từ đối tượng localStorage.
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        //  tạo và trả về một đối tượng header chứa access token đó.
        //  Đối với back-end Spring Boot,
        //  đối tượng header sẽ có thuộc tính Authorization và giá trị access token sẽ được gán vào sau chuỗi 'Bearer '
        // đối tượng header này đóng vai trò quan trọng để xác thực và bảo mật các yêu cầu HTTP đến back-end API của ứng dụng React.
        return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    } else {
        return {};
    }
}
