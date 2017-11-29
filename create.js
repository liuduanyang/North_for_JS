function BinaryTreeNode(data, left, right)
{
    this.data = data;
    this.left = left;
    this.right = right;
    return this;
}

function BinaryTree()
{
    this.root = null;
}

BinaryTree.create_tree_from_array = function(data)
{
    var binary_tree = new BinaryTree();
    //在这里写入代码
    var i=0;
    if(data.length>0){
        data.sort(function(a,b){return a-b;});
        binary_tree.root=new BinaryTreeNode(data[0],null,null);
    	function create(node){
            if(i<(data.length-1)){
            	var newNode=new BinaryTreeNode(data[++i],null,null);
		    	node.right=newNode;
            	create(node.right);
            };
    	}
    	create(binary_tree.root);
    }
    return binary_tree;
};

