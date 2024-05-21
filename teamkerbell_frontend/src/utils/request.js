// // 인증 토큰을 가져오는 함수 (여기서는 예시로 localStorage를 사용)
// export const getAuthToken = () => localStorage.getItem('flirtoken');

// 공통 요청 처리기 (수정 x)
export const sendRequest = async (instance, method, url, data = {}) => {
  try {
    const response = await instance[method](url, data);
    console.log(
      `✅${instance.defaults.baseURL} -[${method}] success :`,
      response
    );
    return response;
  } catch (error) {
    console.error(
      `❌${url}-[${method}] error_response:`,
      error.response,
      `error_status : `,
      error.response.status,
      `error_status_text: `,
      error.response.statusText
    );
    throw error;
  }
};

// 동적 URL 생성
export const createUrl = (path, params = {}) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `${path}${query ? `?${query}` : ""}`;
};

// // 인터셉터 적용 => 백엔드 인증 API 완성 후 적용 예정
// export const applyInterceptors = instance => {
//   instance.interceptors.request.use(
//     async config => {
//       const token = await getAuthToken();
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     },
//   );
// };
