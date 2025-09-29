import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import matplotlib.animation as animation

# 定义立方体的顶点
vertices = np.array([
    [0, 0, 0],  # 0
    [1, 0, 0],  # 1
    [1, 1, 0],  # 2
    [0, 1, 0],  # 3
    [0, 0, 1],  # 4
    [1, 0, 1],  # 5
    [1, 1, 1],  # 6
    [0, 1, 1]   # 7
])

# 定义立方体的面（由顶点索引组成）
faces = [
    [vertices[j] for j in face]
    for face in [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
                 [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]]
]

# 创建一个3D图形
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# 初始化立方体
poly3d = Poly3DCollection(faces, facecolors='cyan', linewidths=1, edgecolors='r', alpha=.25)
ax.add_collection3d(poly3d)

# 设置坐标轴范围
ax.set_xlim([0, 1])
ax.set_ylim([0, 1])
ax.set_zlim([0, 1])

# 定义旋转动画
def rotate(angle):
    ax.view_init(elev=10,im=angle)
    return fig,

# 创建动画
ani = animation.FuncAnimation(fig, rotate, frames=np.arange(0, 360, 2), interval=50)

# 显示图形
plt.show()